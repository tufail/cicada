'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	externals: {
		jquery: 'jQuery'
	},
	watch: false,
	context: `${__dirname}/src/plugin/`,
	entry: {
		cicada: './main.js',
		'cicada.min': './main.js'
	},

	output: {
		path: `${__dirname}/dist/`,
		filename: '[name].js',
		library: 'cicada',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		sourceMapFilename: 'cicada.min.map'
	},

	plugins: [
		new UglifyJSPlugin({
			include: /\.min\.js$/,
			parallel: true,
			sourceMap: true,
			uglifyOptions: {
				compress: true,
				ie8: false,
				ecma: 5,
				output: {
					comments: false
				},
				warnings: true
			}
		})
	],

	module: {
		rules: [
			{
				test: /\.js$/, // Check for all js files
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ 'es2015' ]
						}
					}
				]
			}
		]
	},
	optimization: {
		minimize: false // Let Uglify do this job for min-build only
	},
	devtool: 'source-map'
};
