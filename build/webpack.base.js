/*
 * @Author: liuxin 
 * @Date: 2018-07-26 22:26:36 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-09-26 23:45:20
 */

const config = require('../config')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// 当前项目目录
const projectDir = path.join(__dirname, '..')

function dir(d) {
  return path.join(projectDir, d)
}


module.exports = {
  entry: {
    app: './src/index.js'
  },
  resolve: {
    // // 用于查找模块的目录
    extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.vue'],
    // // 模块别名列表
    alias: {
      vue$: 'vue/dist/vue.js',
      $src: dir('src'),
      '@': dir('src'),
      $assets: dir('src/assets')
    },
    modules: ["node_modules"]
  },
  output: {
    filename: `static/js/[name].[hash:${config.hashLength}].js`,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|svg|jpe?g|gif)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `static/img/[name].[hash:${config.hashLength}].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `static/font/[name].[hash:${config.hashLength}].[ext]`
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}