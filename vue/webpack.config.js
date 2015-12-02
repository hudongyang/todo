var webpack = require('webpack')

module.exports = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: 'build.js'
	},
	module: {
		babel: {
		  	presets: ['es2015', 'stage-0'],
		  	plugins: ['transform-runtime']
		},
		loaders: [
		  	{test: /\.vue$/, loader: 'vue'}
		]
	},
	devtool: 'source-map'
}