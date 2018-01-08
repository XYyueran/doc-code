'use strict'
const path = require('path')//path为node内部方法
const config = require('../config')//导入配置config.js #warning????
const ExtractTextPlugin = require('extract-text-webpack-plugin')//extract-text-webpack-plugin 是将css在打包过程中单独独立出来，避免被打包在js文件里
const packageConfig = require('../package.json')//导入package.json文件

exports.assetsPath = function (_path) {//设置 assetsPath属性值。
  const assetsSubDirectory = process.env.NODE_ENV === 'production'//判断process.env.NODE_ENV是不是为production，process.env.NODE_ENV 的值在build.js中有设置
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)//跨平台路径添加
}

exports.cssLoaders = function (options) {//自定义cssloaders方法
  options = options || {}//参数初始化

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  //用 生成被使用的laoder串让ExtractTextPlugin使用
  /**
   * 
   * @param {loader的名称} loader 
   * @param {loader对应的options配置对象} loaderOptions 
   */
  function generateLoaders (loader, loaderOptions) {//自定义方法，从返回值看应该是控制加载器区分是用vue-style-loader还是正常的样式文件，然后区分生成不同的配置项
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that potion is specified
    // (which is the case during production build)
    // 判断那些使用插件处理的
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 为独立的文件生成loader（排除vue后缀的文件）
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')// node-notifier是一个跨平台的包，以类似浏览器的通知的形式展示信息。
 /**
   * 
   * @param {消息类别} severity 
   * @param {错误信息} errors 
   */
  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]//从异常信息中获得相关信息
    const filename = error.file && error.file.split('!').pop()//获得异常名称

    notifier.notify({//显示
      //异常标题
      title: packageConfig.name,
      //异常内容
      message: severity + ': ' + error.name,
      //异常文件名
      subtitle: filename || '',
      //异常图标
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
