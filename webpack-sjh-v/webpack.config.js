var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin =require('html-webpack-plugin');
module.exports={
	entry:'./src/entry.js',//入口
	output:{//出口
		path:path.join(__dirname,'dist'),
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/,use:ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})}
		]
	},
	plugins:[
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin()
	]

}