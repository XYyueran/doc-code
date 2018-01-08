'use strict'
const path = require('path')//导入path模块
const utils = require('./utils')//导入 util 模块
const webpack = require('webpack')//导入webpack模块
const config = require('../config')//导入配置文件，没有指定文件，则默认指向index.js，如果无，则返回为null
const merge = require('webpack-merge')//// 引入webpack-merge模块。这个模块用于把多个webpack配置合并成一个配置，后面的配置会覆盖前面的配置。
const baseWebpackConfig = require('./webpack.base.conf')//导入配置基础设置
const CopyWebpackPlugin = require('copy-webpack-plugin')//在webpack中拷贝文件和文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin')//导入webpack插件，用来创建创建html入口文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')//文件（主css）单独打包插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')//压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//这压缩代码

const env = require('../config/prod.env')//导入配置文件

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // webpack 全局配置
    new webpack.DefinePlugin({
      'process.env': env
    }), 
    //文件压缩
    new UglifyJsPlugin({
      uglifyOptions: {
          // 在删除未使用的变量等时，显示警告信息，默认就是false
        compress: {
          warnings: false
        }
      },
      // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度）
      // 而且这里不能使用cheap-source-map
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    // css 导出成一个文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    //压缩提取的CSS。我们正在使用这个插件，使之成为可能。
    //重复的CSS从不同的组件可以deduped。 
    new OptimizeCSSPlugin({
       // 这个选项的所有配置都会传递给cssProcessor
      // cssProcessor使用这些选项决定压缩的行为
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin\
    //创建html文件
    new HtmlWebpackPlugin({
      //生成文件名
      filename: config.build.index,
      //模板名称
      template: 'index.html',
      //把script和link放在body底部
      inject: true,
      //配置html的压缩行为
      minify: {
        //移除注释
        removeComments: true,
        //去除空格和换行
        collapseWhitespace: true,
        //尽可能的移除属性中的引号和空属性
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 根据模块的相对路径生成一个四位数的hash作为模块id
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    // 更具模块的相对o路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    // 
    // webpack2处理过的每一个模块都会使用一个函数进行包裹
    // 这样会带来一个问题：降低浏览器中JS执行效率，这主要是闭包函数降低了JS引擎解析速度。
    // webpack3中，通过下面这个插件就能够将一些有联系的模块，
    // 放到一个闭包函数里面去，通过减少闭包函数数量从而加快JS的执行速度。
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // 
    // 这个插件用于提取多入口chunk的公共模块
    // 通过将公共模块提取出来之后，最终合成的文件能够在最开始的时候加载一次
    // 然后缓存起来供后续使用，这会带来速度上的提升。
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    // 将静态文件拷贝到build中
    new CopyWebpackPlugin([
      {
        //定义要拷贝的资源源目录
        from: path.resolve(__dirname, '../static'),
        //目标地址
        to: config.build.assetsSubDirectory,
        //模糊匹配忽略指定文件
        ignore: ['.*']
      }
    ])
  ]
})

//如果开启生产gzip
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      //目标资源名
      // [path]会被替换成原资源路径
      // [query]会被替换成原查询字符串
      asset: '[path].gz[query]',
      // 处理所有匹配此正则表达式的资源
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      //只处理比这个值大的资源
      threshold: 10240,
      //只有压缩比例比这个小的资源才会被处理
      minRatio: 0.8
    })
  )
}

// 如果需要生成一分bundle报告，则需要使用下面的这个插件
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
