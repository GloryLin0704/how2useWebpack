const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map', //调试工具类型

  entry: __dirname + '/src/index.js', //入口文件

  output: {
    path: __dirname + '/build', //文件打包之后的地址
    filename: '[name].js' //打包的文件名
  },

  //在本地启动服务器, 打包文件的相关内容是存储在内存之中的，所以文件夹中没有 build 文件
  devServer: {
    contentBase: path.join(__dirname, 'build'), //本地服务器加载的页面所在目录
    historyApiFallback: true, //所有页面跳转都回到index.html
    inline: true, //热加载
    port: 8080, //默认端口
    proxy: {
      '/api': {
        target: 'http:www.xxx.com'
      }
    }
  },

  //loaders
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/ //不去匹配 node_modules 下的文件
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/',
            limit: 5 * 1024
          }
        }
      }
    ]
  },

  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    }) //以当前目录的 index.html 为模板生成打包的 index.html
  ]
};
