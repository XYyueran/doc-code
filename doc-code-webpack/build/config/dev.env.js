'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')//获取配置文件
//合并配置文件
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
