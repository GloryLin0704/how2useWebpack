module.exports = {
    devtool: "eval-source-map", //调试工具类型

    entry: __dirname + "/app/main.js", //入口文件

    output: {
        path: __dirname + "/public", //文件打包之后的地址
        filename: "bundle.js" //打包的文件名
    },

    //在本地启动服务器
    devServer: {
        contentBase: "./public", //本地服务器加载的页面所在目录
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
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                },
                exclude: /node_modules/ //不去匹配 node_modules 下的文件
            }
        ]
    }
};
