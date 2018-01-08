'use strict'
const utils = require('./utils')//导入utils文件
const config = require('../config')//导入config文件
const isProduction = process.env.NODE_ENV === 'production'//判断process.env.NODE_ENV 运行环境是否为为生产环境
//根据执行环境选择相关的配置的SourceMap
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  //设置不同的css加载器配置
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
