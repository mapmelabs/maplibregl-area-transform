import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

const name = 'maplibregl-area-transform';

export default defineConfig([
    {
        input: 'src/index.ts',
        moduleTypes: {
            '.png': 'dataurl',
        },
        output: [
            {
                file: `dist/${name}.js`,
                format: 'umd',
                sourcemap: true,
                name: 'MaplibreAreaTransform',
            },
            {
                file: `dist/${name}.mjs`,
                format: 'es',
                sourcemap: true,
            },
        ],
    },
    {
        input: { [name]: 'src/index.ts' },
        plugins: [dts({ emitDtsOnly: true })],
        output: {
            dir: 'dist',
            format: 'es',
        },
    },
]);
