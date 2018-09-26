'use strict'

const { VueLoaderPlugin } = require('vue-loader');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require('path');
const webpack = require("webpack");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: ["@babel/polyfill",'./src/app/app.js'],
    output: {
        path: path.resolve(__dirname, './src'),
        filename: 'all.js'
    },
    optimization: {
        minimize: true
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
            },
            {
                test: /.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [ 
        new VueLoaderPlugin(),
        new MinifyPlugin({}, {sourceMap: null})
    ]
}