/*
 * @Author: liuxin 
 * @Date: 2018-07-26 22:26:36 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-05 15:16:41
 */

const merge = require('webpack-merge')
const webpack = require('webpack')
const baseBuild = require('./webpack.base')
// html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')

process.env.NODE_ENV = 'development'

module.exports = (env, argv) => {
  return merge(baseBuild, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      port: config.dev.port,
      clientLogLevel: "error",
      compress: true,
      // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
      // contentBase: './dist',
      hot: true,
      // 调试时使用history刷新不出错
      historyApiFallback: true
    },
    module: {
      rules: [
        // 因在dev环境下使用mini-css-extract-plugin会影响HMR，具体表现在修改组件内的style时不会触发热更新，因此单独提出来
        {
          test: /\.css$/ig,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
          ]
        },
        {
          test: /\.scss$/ig,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      // 模块热替换(Hot Module Replacement 或 HMR)
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: '',
        filename: 'index.html',
        template: 'src/template/index.html'
      }),
    ]
  })
}