const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require("terser-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization : {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            //分割代码块
            maxInitialRequests:6, //默认是5
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1,
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 3 //重复引入了几次
                },
            }
        },
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
    ]
});