const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './build'),
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: "/node_modules/",
                use: 'ts-loader'
            },
            {
                test: /\.(scss|css)$/i,
                exclude: "/node_modules/",
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"),
        })
    ]
};
