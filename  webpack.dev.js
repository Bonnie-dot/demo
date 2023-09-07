import common from './webpack.common.js';
import {merge} from 'webpack-merge';
const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: 'dist',
        port: 3000,
        // redirect index.html and show content via route
        historyApiFallback: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8080',
        //         pathRewrite: { '^/api': '' },
        //         changeOrigin: true,
        //     },
        // },
    },
});
export default config;