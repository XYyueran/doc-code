这个是 webpack的多页面配置内容
==
思路
--
- css导入和单独打包 *style-loader css-loader extract-text-webpack-plugin*
-js压缩 *webpack.optimize.UglifyJsPlugin*
-自启动本地浏览 
-公共模块提取 *CommonsChunkPlugin*
-生产模式和开发模式分离*参考vue-cli 的形式*
-
#备注
--
-rimraf 清除文件夹文件
-html-webpack-plugin 将 webpack中'entry'配置的相关入口thunk  和  'extract-text-webpack-plugin'抽取的css样式   插入到该插件提供的'template'或者'templateContent'配置项指定的内容基础上生成一个html文件，具体插入方式是将样式'link'插入到'head'元素中，'script'插入到'head'或者'body'中
#问题 2018-1-17
现在的问题是webpack的最初定义是对单页面的，暂时还没有发现对多页面的构造方法。
#问题 2018-1-25
发现能采用多次new webpackhtmlplugin 生成不同的配置，来打包不同的页面，但是感觉有不尽如人意。今天发现了一个感觉靠谱的思路。决定试一试。原本想用一个纯粹的配置，但是现在需要加入实际的东西去实现。思路来演https://segmentfault.com/a/1190000007159115