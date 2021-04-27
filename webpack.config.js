const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    context: __dirname,

    entry: './src/index.js',

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
                test: /\.js$/,
                use: 'babel-loader',
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
        extensions: ['.js', '.vue'],
    },

    externals: {
        vue: 'vue',
    }
};
