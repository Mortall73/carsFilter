'use strict'

const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    entry: './src/app/app.js',
    output: {
        path: path.resolve(__dirname, './src'),
        filename: 'all.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' для webpack 1
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: [ new VueLoaderPlugin() ]
}