/*
 * @Author: liuxin
 * @Date: 2018-07-27 14:46:21
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-09-26 14:21:16
 */

let startTime = new Date()
process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const prodConfig = require('./webpack.prod')
const config = require('../config')
const { setVersion } = require('./util')

const spinner = ora('building for production... \n')
spinner.start()

console.log(chalk.magenta(`......... 先删除 ${config.dist} 文件夹 ......... \n`))
// 先删除dist
rm(config.dist, err => {
  if(err) throw err
  console.log(chalk.blueBright(`......... 删除 ${config.dist} 文件夹完成 ......... \n`))
  console.log(chalk.magenta(`......... 开始构建 ......... \n`))
  let buildTime = new Date()
  webpack(prodConfig(), (err, stats) => {
    spinner.stop()
    if(err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if(stats.hasErrors()) {
      console.log(chalk.red('......... 构建出错 ......... \n'))
      process.exit(1)
    }

    setVersion()

    console.log(chalk.cyan(` 构建完成，运行总用时约 ${(new Date() - startTime) / 1000} s，构建用时约 ${(new Date() - buildTime) / 1000} s \n`))
    console.log(chalk.yellow('......... 构建结束了， 恭喜恭喜 .........'))
  })
})




