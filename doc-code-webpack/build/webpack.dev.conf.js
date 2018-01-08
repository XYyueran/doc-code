'use strict'
const utils = require('./utils')//导入 util 模块
const webpack = require('webpack')//导入webpack模块
const config = require('../config')//导入配置文件
const merge = require(rge'webpack-me')//// 引入webpack-merge模块。这个模块用于把多个webpack配置合并成一个配置，后面的配置会覆盖前面的配置。
const baseWebpackConfig = require('./webpack.base.conf')//webpack 基础配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin')//导入webpack插件，用来创建创建html入口文件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')//webpack插件 这个插件能够更好的在终端看到webpack运行时的错误和警告等信息。可以提升开发体验。
const portfinder = require('portfinder')// 查找一个未使用的端口

const HOST = process.env.HOST;//获取host环境变量
const PORT = process.env.PORT && Number(process.env.PORT)//获取port环境变量
//将webpack.base配置文件和一个自定义配置合并
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    //配置自定义cssloader参数
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // 对于测试环境来说，使用cheap-module-eval-source-map 是最快的
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    //404是跳转页面
    historyApiFallback: true,
    //热更新
    hot: true,
    //当它被设置为true的时候对所有的服务器资源采用gzip压缩
    compress: true,
    //端口
    port: PORT || config.dev.port,
    //主机
    host: HOST || config.dev.host,
    //开启的浏览器
    open: config.dev.autoOpenBrowser,
    //这个配置属性用来在编译出错的时候，在浏览器页面上显示错误
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    //
    publicPath: config.dev.assetsPublicPath,

    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
  //设置webpack 全局变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    //热替换
    new webpack.HotModuleReplacementPlugin(),
    // 这个插件的主要作用就是在热加载的时候直接返回更新文件的名称，而不是文件的id
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 简化了HTML文件的创建，以便为您的webpack包提供服务
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  //通过配置设置端口号
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      // 设置环境端口号
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      // 添加FriendlyErrorsPlugin 插件到devWebpackConfig（合并了webpack.base.js的） 变量中
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        // 编译成功时候的输出信息
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        //编译出错时
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
