import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';

const config = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName:
                                    '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            //分割代码块
            maxInitialRequests: 6, //默认是5
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1,
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 3, //重复引入了几次
                },
            },
        },
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin(),
    ],
})
export default config
