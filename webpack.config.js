const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                // it handled ts and jsx
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader','sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    devServer: {
        static: './dist',
        port: 3000
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WorkShop',
            template: "./public/template.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/favicon.ico', to: 'favicon.ico' }
            ],
        }),
    ],
};
