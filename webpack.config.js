const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OUTPUT_FOLDER = 'dist';

module.exports = (env) => {
    const config = {
        entry: './src/Index.tsx',
        mode: env.prod ? 'production' : 'development',
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
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset',
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, OUTPUT_FOLDER),
            clean: true,
            assetModuleFilename: 'images/[hash][ext][query]'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'WorkShop',
                template: "./public/template.html",
                favicon: './public/favicon.ico',
                hash: true
            }),
        ],
    }
    if (env.prod) {
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()],
        }
        config.devtool = 'source-map';
    } else {
        config.devServer = {
            static: OUTPUT_FOLDER,
            port: 3000,
            // redirect index.html and show content via route
            historyApiFallback: true,
        };
        config.devtool = 'inline-source-map';
    }
    return config;
}
