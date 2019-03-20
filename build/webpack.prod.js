/*
 * @Author: liuxin 
 * @Date: 2018-07-26 22:26:36 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-05 16:41:35
 */

const path = require('path')
const merge = require("webpack-merge")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 用于将组件内的css分开打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// css压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const baseBuild = require("./webpack.base")

const config = require('../config')
// 当前项目目录
const projectDir = process.cwd()

process.env.NODE_ENV = 'production'

function dir(d) {
  return path.join(projectDir, d)
}

module.exports = (env, argv) => {
  return merge(baseBuild, {
    mode: 'production',
    output: {
      hashDigestLength: config.hashLength,
      chunkFilename: 'static/js/[name].[hash].js',
      path: config.build.assetsRoot,
      publicPath: config.build.assetsPublicPath,
    },
    module: {
      // 因在dev环境下使用mini-css-extract-plugin会影响HMR，具体表现在修改组件内的style时不会触发热更新，因此单独提出来
      rules: [
        {
          test: /\.css$/ig,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ]
        },
        {
          test: /\.scss$/ig,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `static/css/[name].[hash:${config.hashLength}].css`
        // chunkFilename: `css/[id].css`
      }),
      new HtmlWebpackPlugin({
        title: '',
        filename: config.build.index,
        template: 'src/template/index.html',
        dist: dir('dist'),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        chunksSortMode: 'dependency'
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          uglifyOptions: {
            output: {
              beautify: false, //不需要格式化
              comments: false //不保留注释
            },
            compress: {
              warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
              drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
              collapse_vars: true, // 内嵌定义了但是只用到一次的变量
              reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0, // This is example is too small to create commons chunks
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    }
  })  
}