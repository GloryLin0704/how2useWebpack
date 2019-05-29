const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js', //入口文件

  output: {
    path: __dirname + '/build', //文件打包之后的地址
    filename: '[name].[hash: 7].js' //打包的文件名，加上哈希值，去掉缓存
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
        test: /\.(png|jpg|jpge|gif|svg)/,
        use: {
          loader: 'url-loader',
          limit: 5 * 1024
        }
      }
    ]
  },

  //插件
  plugins: [
    new webpack.BannerPlugin('I am Glory'), //打包时候加进入的文字
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    }), //以当前目录的 index.html 为模板生成打包的 index.html
    new webpack.optimize.OccurrenceOrderPlugin(), //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new ExtractTextPlugin('style.css'), //分离CSS和JS文件
    new CleanWebpackPlugin() //清除上一个 build 文件
  ]
};
