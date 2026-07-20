import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
    {
        ignores: ['dist/**', 'docs/**', 'coverage/**', 'node_modules/**'],
    },
    {
        files: ['**/*.{ts,js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: typescriptParser,
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-member-accessibility': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/lines-between-class-members': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-extra-semi': 'off',
            '@typescript-eslint/no-parameter-properties': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            'prettier/prettier': 'error',
        },
    },
]
