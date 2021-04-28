const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    context: __dirname,

    devtool: 'source-map',

    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'vue-checkbox-radio',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    
    plugins: [
        new VueLoaderPlugin()
    ],

    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            vue: '@vue/runtime-dom'
        }
    },

    externals: {
        vue: 'vue',
    }
};
