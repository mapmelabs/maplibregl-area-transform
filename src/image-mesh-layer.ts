import type {CustomLayerInterface, CustomRenderMethodInput, ErrorEvent, Map} from 'maplibre-gl'

export type ImageMeshCoordinates = [[number, number], [number, number], [number, number], [number, number]]

export type MaplibreImageMeshLayerOptions = {
    id: string
    imageUrl: string
    coordinates: ImageMeshCoordinates
    opacity?: number
    minzoom?: number
    maxzoom?: number
}

type ProgramState = {
    program: WebGLProgram
    projectionMatrix: WebGLUniformLocation | null
    tileMercatorCoords: WebGLUniformLocation | null
    clippingPlane: WebGLUniformLocation | null
    projectionTransition: WebGLUniformLocation | null
    fallbackMatrix: WebGLUniformLocation | null
    image: WebGLUniformLocation | null
    opacity: WebGLUniformLocation | null
}

const mercatorLatitudeMax = 85.051129
const gridSizeDefault = 16

const mercatorXGet = (longitude: number) => (longitude + 180) / 360
const mercatorYGet = (latitude: number) => {
    const clamped = Math.max(-mercatorLatitudeMax, Math.min(mercatorLatitudeMax, latitude))
    const radians = (clamped * Math.PI) / 180
    return (1 - Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) / 2
}

const coordinatesUnwrap = (coordinates: ImageMeshCoordinates): ImageMeshCoordinates => {
    const anchor = coordinates[0][0]
    return coordinates.map(([longitude, latitude]) => [
        longitude + 360 * Math.round((anchor - longitude) / 360),
        latitude,
    ]) as ImageMeshCoordinates
}

export const imageMeshDataGet = (coordinates: ImageMeshCoordinates, gridSize = gridSizeDefault) => {
    const size = Math.max(1, Math.floor(gridSize))
    const corners = coordinatesUnwrap(coordinates).map(([longitude, latitude]) => [
        mercatorXGet(longitude),
        mercatorYGet(latitude),
    ])
    const vertices = new Float32Array((size + 1) ** 2 * 4)
    const indices = new Uint16Array(size * size * 6)
    let vertexOffset = 0
    for (let y = 0; y <= size; y++) {
        const v = y / size
        for (let x = 0; x <= size; x++) {
            const u = x / size
            const topX = corners[0]![0]! + (corners[1]![0]! - corners[0]![0]!) * u
            const topY = corners[0]![1]! + (corners[1]![1]! - corners[0]![1]!) * u
            const bottomX = corners[3]![0]! + (corners[2]![0]! - corners[3]![0]!) * u
            const bottomY = corners[3]![1]! + (corners[2]![1]! - corners[3]![1]!) * u
            vertices[vertexOffset++] = topX + (bottomX - topX) * v
            vertices[vertexOffset++] = topY + (bottomY - topY) * v
            vertices[vertexOffset++] = u
            vertices[vertexOffset++] = v
        }
    }
    let indexOffset = 0
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const topLeft = y * (size + 1) + x
            const topRight = topLeft + 1
            const bottomLeft = topLeft + size + 1
            const bottomRight = bottomLeft + 1
            indices[indexOffset++] = topLeft
            indices[indexOffset++] = topRight
            indices[indexOffset++] = bottomRight
            indices[indexOffset++] = topLeft
            indices[indexOffset++] = bottomRight
            indices[indexOffset++] = bottomLeft
        }
    }
    return {vertices, indices}
}

const shaderCompile = (gl: WebGL2RenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) throw new Error('Unable to create image mesh shader')
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error(`Unable to compile image mesh shader: ${message}`)
    }
    return shader
}

const programCreate = (gl: WebGL2RenderingContext, shaderData: CustomRenderMethodInput['shaderData']): ProgramState => {
    const vertexShader = shaderCompile(
        gl,
        gl.VERTEX_SHADER,
        `#version 300 es
        ${shaderData.vertexShaderPrelude}
        ${shaderData.define}
        layout(location = 0) in vec2 a_position;
        layout(location = 1) in vec2 a_uv;
        out vec2 v_uv;
        void main() {
            v_uv = a_uv;
            gl_Position = projectTile(a_position);
        }`,
    )
    const fragmentShader = shaderCompile(
        gl,
        gl.FRAGMENT_SHADER,
        `#version 300 es
        precision highp float;
        uniform sampler2D u_image;
        uniform float u_opacity;
        in vec2 v_uv;
        out vec4 fragColor;
        void main() {
            fragColor = texture(u_image, v_uv) * u_opacity;
        }`,
    )
    const program = gl.createProgram()
    if (!program) throw new Error('Unable to create image mesh program')
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const message = gl.getProgramInfoLog(program)
        gl.deleteProgram(program)
        throw new Error(`Unable to link image mesh program: ${message}`)
    }
    return {
        program,
        projectionMatrix: gl.getUniformLocation(program, 'u_projection_matrix'),
        tileMercatorCoords: gl.getUniformLocation(program, 'u_projection_tile_mercator_coords'),
        clippingPlane: gl.getUniformLocation(program, 'u_projection_clipping_plane'),
        projectionTransition: gl.getUniformLocation(program, 'u_projection_transition'),
        fallbackMatrix: gl.getUniformLocation(program, 'u_projection_fallback_matrix'),
        image: gl.getUniformLocation(program, 'u_image'),
        opacity: gl.getUniformLocation(program, 'u_opacity'),
    }
}

export class MaplibreImageMeshLayer implements CustomLayerInterface {
    readonly id: string
    readonly type = 'custom' as const
    readonly renderingMode = '2d' as const
    readonly minzoom?: number
    readonly maxzoom?: number

    private map: Map | null = null
    private coordinates: ImageMeshCoordinates
    private imageUrl: string
    private opacity: number
    private vertexArray: WebGLVertexArrayObject | null = null
    private vertexBuffer: WebGLBuffer | null = null
    private indexBuffer: WebGLBuffer | null = null
    private texture: WebGLTexture | null = null
    private pendingImage: TexImageSource | null = null
    private indexCount = 0
    private meshDirty = true
    private imageRequestId = 0
    private programs = new globalThis.Map<string, ProgramState>()

    constructor(options: MaplibreImageMeshLayerOptions) {
        this.id = options.id
        this.imageUrl = options.imageUrl
        this.coordinates = options.coordinates
        this.opacity = options.opacity ?? 1
        this.minzoom = options.minzoom
        this.maxzoom = options.maxzoom
    }

    onAdd(map: Map, gl: WebGL2RenderingContext): void {
        this.map = map
        this.vertexArray = gl.createVertexArray()
        this.vertexBuffer = gl.createBuffer()
        this.indexBuffer = gl.createBuffer()
        gl.bindVertexArray(this.vertexArray)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
        gl.enableVertexAttribArray(0)
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0)
        gl.enableVertexAttribArray(1)
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
        gl.bindVertexArray(null)
        this.imageLoad()
    }

    onRemove(_map: Map, gl: WebGL2RenderingContext): void {
        this.imageRequestId++
        this.programs.forEach(({program}) => gl.deleteProgram(program))
        this.programs.clear()
        if (this.texture) {
            gl.deleteTexture(this.texture)
        }
        if (this.vertexBuffer) {
            gl.deleteBuffer(this.vertexBuffer)
        }
        if (this.indexBuffer) {
            gl.deleteBuffer(this.indexBuffer)
        }
        if (this.vertexArray) {
            gl.deleteVertexArray(this.vertexArray)
        }
        this.texture = null
        this.pendingImage = null
        this.vertexBuffer = null
        this.indexBuffer = null
        this.vertexArray = null
        this.map = null
    }

    setCoordinates(coordinates: ImageMeshCoordinates): void {
        this.coordinates = coordinates
        this.meshDirty = true
        this.map?.triggerRepaint()
    }

    setOpacity(opacity: number): void {
        this.opacity = opacity
        this.map?.triggerRepaint()
    }

    setImageUrl(imageUrl: string): void {
        if (this.imageUrl === imageUrl) return
        this.imageUrl = imageUrl
        this.imageLoad()
    }

    render(gl: WebGL2RenderingContext, options: CustomRenderMethodInput): void {
        this.textureUpload(gl)
        if (!this.texture || !this.vertexArray || !this.vertexBuffer || !this.indexBuffer) return
        gl.bindVertexArray(this.vertexArray)
        this.meshUpload(gl)
        let state = this.programs.get(options.shaderData.variantName)
        if (!state) {
            state = programCreate(gl, options.shaderData)
            this.programs.set(options.shaderData.variantName, state)
        }
        const projection = options.defaultProjectionData
        gl.useProgram(state.program)
        gl.uniformMatrix4fv(state.projectionMatrix, false, projection.mainMatrix)
        gl.uniform4fv(state.tileMercatorCoords, projection.tileMercatorCoords)
        gl.uniform4fv(state.clippingPlane, projection.clippingPlane)
        gl.uniform1f(state.projectionTransition, projection.projectionTransition)
        gl.uniformMatrix4fv(state.fallbackMatrix, false, projection.fallbackMatrix)
        gl.uniform1i(state.image, 0)
        gl.uniform1f(state.opacity, this.opacity)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0)
        gl.bindVertexArray(null)
    }

    private meshUpload(gl: WebGL2RenderingContext): void {
        if (!this.meshDirty) return
        const {vertices, indices} = imageMeshDataGet(this.coordinates)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
        this.indexCount = indices.length
        this.meshDirty = false
    }

    private imageLoad(): void {
        const map = this.map
        if (!map) return
        const requestId = ++this.imageRequestId
        this.pendingImage = null
        map.loadImage(this.imageUrl)
            .then(({data}) => {
                if (requestId !== this.imageRequestId || map !== this.map) return
                this.pendingImage = data
                map.triggerRepaint()
            })
            .catch(error => {
                if (requestId === this.imageRequestId && map === this.map) {
                    map.fire('error', {error} as ErrorEvent)
                }
            })
    }

    private textureUpload(gl: WebGL2RenderingContext): void {
        if (!this.pendingImage) return
        const texture = gl.createTexture()
        if (!texture) return
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        const premultiplied = gl.getParameter(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.pendingImage)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplied)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        if (this.texture) {
            gl.deleteTexture(this.texture)
        }
        this.texture = texture
        this.pendingImage = null
    }
}
