var webpack = require('webpack')
var path = require("path")
var ExtractTextPlugin= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
	devtool:'source-map',
	entry:'./src/entry.js',//入口
	output:{//出口
		path:path.join(__dirname,'dist'),//__dirname+'/dist',//__dirname 为当前路径的根目录
		//publicPath:'./dist/',
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/,use:ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})},
			{test:/\.js$/,loaders:['babel-loader'],exclude: path.join(__dirname,'node_module')},
			{test:/\.(png|jpg|gif)$/,loaders:['url-loader?limit=20000&name=images/[hash:12].[ext]'],exclude: path.join(__dirname,'node_module')}

		]
	},
	plugins:[
		new webpack.BannerPlugin("This file is created by zhaoda"),
		new ExtractTextPlugin("style.css"),//将loader配置的文件的都单独打包成一个文件
		new HtmlWebpackPlugin()
	]
}