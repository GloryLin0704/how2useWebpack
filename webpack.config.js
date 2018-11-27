const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-source-map", //调试工具类型

    entry: __dirname + "/app/main.js", //入口文件

    output: {
        path: __dirname + "/build", //文件打包之后的地址
        filename: "bundle.js" //打包的文件名
    },

    //在本地启动服务器
    devServer: {
        contentBase: path.join(__dirname, "build"), //本地服务器加载的页面所在目录
        historyApiFallback: true, //所有页面跳转都回到index.html
        inline: true, //热加载
        port: 8080 //默认端口
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
        new webpack.BannerPlugin("I am Glory"),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html" //new 一个这个插件的实例，并传入相关参数
        })
    ]
};
