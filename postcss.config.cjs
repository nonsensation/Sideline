
const autoprefixer = require( "autoprefixer" )
const postcssPresetEnv = require( "postcss-preset-env" )

// https://www.postcss.parts/
// https://github.com/postcss/postcss/blob/main/docs/plugins.md

const config = {
    plugins: [
        postcssPresetEnv( {
            stage: 3,
            features: {
                "nesting-rules": true,
            },
        } ),
        autoprefixer,
    ],
}

module.exports = config
