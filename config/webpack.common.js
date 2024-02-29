import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import Webpack from 'webpack'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const config = {
    entry: './src/Index.tsx',
    cache: true,
    module: {
        rules: [
            {
                // it handled ts and jsx
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // This speeds up TypeScript type checking and ESLint linting by moving each to a separate process.
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        symlinks: false, //you can use npm link
        cacheWithContext: false, // if you use custom resolving plugins, that are not context specific.
    },
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WorkShop',
            template: './public/template.html',
            favicon: './public/favicon.ico',
            hash: true,
        }),
        new ForkTsCheckerWebpackPlugin(),
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'], //不删除dll目录
        // }),
        // new Webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json'),
        // }),
    ],
}
export default config
