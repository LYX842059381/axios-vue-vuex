/*
 * @Author: liuxin
 * @Date: 2018-07-27 16:40:13
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-03 23:02:11
 */

module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-adaptive': {
      remUnit: 40,
      autoRem: true
    },
    'postcss-preset-env': {
      features: {
        customProperties: {
          variables: {
            mainColor: 'red',
            altColor: 'blue'
          }
        }
      }
    },
    'postcss-clean': {}
  }
}