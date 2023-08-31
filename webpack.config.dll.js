const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
// DllPlugin 将不会频繁更新的库进行编译，当这些依赖的版本没有变化时，就不需要重新编译

module.exports = {
    entry: {
        react: ['react', 'react-dom','react-router-dom']
    },
    mode: 'production',
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, 'dist', 'dll'),
        library: '[name]_dll' //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    devtool: 'source-map',
    optimization : {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new webpack.DllPlugin({
            //name和library一致
            name: '[name]_dll',
            path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json') //manifest.json的生成路径
        })
    ]
}
