'use strict';

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var precss = require('precss');
var SpritesmithPlugin = require('webpack-spritesmith');

var __f7Path = path.join(__dirname, 'node_modules/framework7');
var __src = path.join(__dirname, 'src');

var templateFunction = function (data) {
	var ratio = 2;
	var shared = '[class^="spr-"], [class*=" spr-"] { background-image: url(I); background-size: Wpx Hpx }'
		.replace('I', data.sprites[0].image)
		.replace('W', data.sprites[0].total_width / ratio)
		.replace('H', data.sprites[0].total_height / ratio);

	var perSprite = data.sprites.map(function (sprite) {
		return '.spr-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
			.replace('N', sprite.name)
			.replace('W', sprite.width / ratio)
			.replace('H', sprite.height / ratio)
			.replace('X', sprite.offset_x / ratio)
			.replace('Y', sprite.offset_y / ratio);
	}).join('\n');

	return shared + '\n' + perSprite;
};

module.exports = {
	watch: false,
	entry: {
		main: './src/main'
	},
	output: {
		filename: 'bundle.js',
		path: 'dist/js'
	},
	resolve: {
		alias: {
			'framework7.ios.colors.min.css': path.join(__f7Path, 'dist/css/framework7.ios.colors.min.css'),
			'framework7.ios.min.css': path.join(__f7Path, 'dist/css/framework7.ios.min.css'),
			'main.sass': path.join(__src, 'assets/sass/main.sass'),
			'bootstrap': path.join(__src, 'assets/js/bootstrap.js'),
			'libs': path.join(__src, 'assets/js/libs'),
			'components': path.join(__src, 'assets/js/components')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.join(__src, 'assets/js'),
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{ test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },

			{ test: /\.html$/, loaders: [] },

			{
				test: /\.(gif|png|jpg)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=../img/[name].[ext]'
			},
			{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=../fonts/[name].[ext]' },
		]
	},
	postcss: function() {
		return {
			defaults: [ autoprefixer, precss ],
			cleaner:  [ autoprefixer({ browsers: ['not Explorer', 'not Edge', 'not Opera', 'not Firefox', 'not FirefoxAndroid', 'not ExplorerMobile'] }) ]
		};
	},
	plugins: [
		new ExtractTextPlugin('../css/bundle.css'),
		new CopyWebpackPlugin([
			{ from: path.join(__src, 'public'), to: '../' },
			{ from: path.join(__src, 'assets/img'), to: '../img/' }
		]),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			cors: true,
			open: false,
			server: {
				baseDir: ['dist'],
				middleware: function (req, res, next) {
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.setHeader('Access-Control-Allow-Credentials', true);
					next();
				}
			}
		})
	]
};
