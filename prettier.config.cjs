const baseConfig = require('./prettier-base')

module.exports = {
    ...baseConfig,
    overrides: [
        {
            files: ['*.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
}
