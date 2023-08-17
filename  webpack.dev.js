const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: 'dist',
        port: 3000,
        // redirect index.html and show content via route
        historyApiFallback: true,
    },
});