'use strict'
const path = require('path')//导入node的path 模块
const utils = require('./utils')//导入utils文件
const config = require('../config')//导入配置文件
const vueLoaderConfig = require('./vue-loader.conf')//导入vue-loader.conf这个配置
//生成更目录的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),//设置相对路径
  //输入路径
  entry: {
    app: './src/main.js'
  },
//输出路径
  output: {
    path: config.build.assetsRoot,//路径设置项
    //生成文件名字
    //[name] 会被块名替换掉。
    //[hash]会被编译的hash替换掉
    //[chunkhash]会被块的hash替换掉。
    filename: '[name].js',
    //根据当前环境设置路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 一个包含模块扩展名的数组，指定某些文件可以省略后缀添加
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    //配置项
    rules: [
      {
        //vue文件加载
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        //对所有js文件执行es6编译
        test: /\.js$/,
        loader: 'babel-loader',
        //包含文件路径为src 和test中的文件
        include: [resolve('src'), resolve('test')]
      },
      {
        //图片文件引用处理
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        //播放文件处理
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        //图标文件处理
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
