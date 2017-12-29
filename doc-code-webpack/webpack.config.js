var webpack = require('webpack')
var path = require("path")
module.exports={
	devtool:'source-map',
	entry:'./src/entry.js',//入口
	output:{//出口
		path:path.join(__dirname,'dist'),//__dirname+'/dist',//__dirname 为当前路径的根目录
		publicPath: "/dist/",
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:'style-loader!css-loader'},
			{test:/\.js$/,loaders:['babel-loader'],exclude: path.join(__dirname,'node_module')},
			{test:/\.(png|jpg|gif)$/,loaders:['url-loader?limit=20000&name=images/[hash:12].[ext]'],exclude: path.join(__dirname,'node_module')}

		]
	},
	plugins:[
		new webpack.BannerPlugin("This file is created by zhaoda")
	]
}