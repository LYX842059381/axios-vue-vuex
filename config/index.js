/*
 * @Author: liuxin 
 * @Date: 2018-07-26 23:16:32 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-09-26 16:33:42
 */

const path = require('path')
const DIST_MODULE = '/'

function base() {
  const args = [path.resolve(__dirname, '../')].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

const paths = {
  SRC: 'src',
  OUT_DIR: 'dist',
  TEST: 'test'
}

const environment = {
  dev: {
    // Paths
    proxyTable: {},
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8989, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, `../dist${DIST_MODULE}/index.html`),
    // Paths
    assetsRoot: path.resolve(__dirname, `../dist${DIST_MODULE}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: `${DIST_MODULE}/`
  }
}

module.exports = {
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  src: base.call(null, paths.SRC),
  dist: base.call(null, paths.OUT_DIR),
  assets: base.call(null, paths.SRC + '/assets'),
  static: base.call(null, paths.OUT_DIR + '/static'),
  hashLength: 8,
  ...environment
}