const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    devtool: "eval-source-map", //调试工具类型

    entry: __dirname + "/app/main.js", //入口文件

    output: {
        path: __dirname + "/build", //文件打包之后的地址
        filename: "bundle.js-[hash].js" //打包的文件名，加上哈希值，去掉缓存
    },

    //loaders
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/ //不去匹配 node_modules 下的文件
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: "[name]__[local]--[hash:base64:5]" // 指定css的类名格式
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },

    //插件
    plugins: [
        new webpack.BannerPlugin("I am Glory"), //打包时候加进入的文字
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html" //new 一个这个插件的实例，并传入相关参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(), //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new ExtractTextPlugin("style.css"), //分离CSS和JS文件
        new CleanWebpackPlugin("build/*.*", {
            root: __dirname,
            verbose: true,
            dry: false
        }) //清除上一个 bundle 文件
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    } //压缩JS代码
};
