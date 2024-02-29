import webpack from 'webpack'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
    },
    mode: 'production',
    output: {
        clean: true,
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, 'dist', 'dll'),
        library: '[name]_dll', //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        // new webpack.DllPlugin({
        //     //name和library一致
        //     name: '[name]_dll',
        //     path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json'), //manifest.json的生成路径
        // }),
    ],
}
