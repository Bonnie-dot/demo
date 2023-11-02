import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './config/ webpack.dev.js'

const compiler = Webpack(webpackConfig)
const devServerOptions = { ...webpackConfig.devServer, open: true }
const server = new WebpackDevServer(devServerOptions, compiler)
server.startCallback(() => {
    console.log('Successfully started server on http://localhost:3000')
})
