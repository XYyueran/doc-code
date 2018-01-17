
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const HtmlWebpackPlugin =require('html-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {test:/\.css$/,use:ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})},
    ]
  },

  devtool: config.dev.devtool,
  devServer: {
    contentBase:"./dist",
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: "true",
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, 
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  console.log("==============================================");
  console.log(__dirname);
  console.log("==============================================");
  resolve(devWebpackConfig)
  // portfinder.basePort = process.env.PORT || config.dev.port
  // portfinder.getPort((err, port) => {
  //   if (err) {
  //     reject(err)
  //   } else {
  //     // publish the new Port, necessary for e2e tests
  //     process.env.PORT = port
  //     // add port to devServer config
  //     devWebpackConfig.devServer.port = port

  //     resolve(devWebpackConfig)
  //   }
  // })
})
