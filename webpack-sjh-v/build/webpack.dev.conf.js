
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT);
const HtmlWebpackPlugin =require('html-webpack-plugin');
const utils = require("./utils");


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {test:/\.css$/,use:ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})},
    ]
  },

  devtool: config.dev.devtool,
  // devServer: {
  //   contentBase:"./dist",
  //   clientLogLevel: 'warning',
  //   historyApiFallback: true,
  //   hot: true,
  //   compress: true,
  //   host: HOST || config.dev.host,
  //   port: PORT || config.dev.port,
  //   open: "true",
  //   overlay: config.dev.errorOverlay
  //     ? { warnings: false, errors: true }
  //     : false,
  //   publicPath: config.dev.assetsPublicPath,
  //   proxy: config.dev.proxyTable,
  //   quiet: true, 
  //   watchOptions: {
  //     poll: config.dev.poll,
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    new ExtractTextPlugin('style.css'),
  ]
})

let htmls = utils.getEntry('./src/view/**/*.html', 'src\\view\\');
let entries = {};
let HtmlPlugin = [];
for (let key in htmls) {
  console.log(key)
    entries[key] = htmls[key].replace('.html', '.js')
    devWebpackConfig.plugins.push(new HtmlWebpackPlugin({
      //filename: (key == 'index\\index' ? 'index.html' : key + '.html'), 
      filename:  key + '.html', 
      template: htmls[key],
      inject: true,
         chunks: [key]
    }))
}
devWebpackConfig.entry=entries;
module.exports = new Promise((resolve, reject) => {
  devWebpackConfig.plugins.concat(HtmlPlugin)
  resolve(devWebpackConfig)
})
