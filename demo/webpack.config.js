/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, '..');

module.exports = {
    mode: 'development',
    context: context,
    entry: {
        index: path.join(context, 'demo', 'index.js')
    },
    output: {
        path: path.join(context, 'demo', 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: ['node_modules'],
        alias: {
            'react-intl-lite': path.resolve(__dirname, '../src/')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'react-intl-lite'})
    ],
    devServer: {
        port: 8018,
        open: true,
        compress: true,
        inline: true,
        hot: false
    },
    devtool: 'source-map'
};
