var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin =require('html-webpack-plugin');
module.exports={
	//devtool:'source-map',
	entry:{
		entry:'./src/entry.js',
		jsFOne:'./src/jsFOne.js'
	},//入口
	output:{//出口
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/,use:ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})}
		]
	},
	plugins:[
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.optimize.CommonsChunkPlugin({
	    	name: 'common'
	    })
	],
	devServer:{
		historyApiFallback:true,
		inline:true,
		port:'8080',
		open:true,

	}

}