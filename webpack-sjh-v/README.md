# webpack-sjh-v
这个是 webpack的多页面配置内容
==
思路
--
- css导入和压缩和单独打包 *style-loader css-loader extract-text-webpack-plugin *
备注
--
-rimraf 清除文件夹文件
-html-webpack-plugin 将 webpack中'entry'配置的相关入口thunk  和  'extract-text-webpack-plugin'抽取的css样式   插入到该插件提供的'template'或者'templateContent'配置项指定的内容基础上生成一个html文件，具体插入方式是将样式'link'插入到'head'元素中，'script'插入到'head'或者'body'中