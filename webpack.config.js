const  path = require("path"),
        webpack = require("webpack"),
        HtmlWebPackPlugin = require("html-webpack-plugin"),
        MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    context: __dirname,
    entry: [
        path.resolve(__dirname,"public/src/index.js")
    ],
    output: {
        path: path.resolve(__dirname,"dist"),
        publicPath: "/",
        filename: "js/bundle.js", 
    },
    module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [
                {
                loader: "html-loader",
                options: { minimize: true }
                }
            ]
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
    ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};