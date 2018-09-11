const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = {
	entry: [
		path.resolve(__dirname, './src/js/main.js'),
		path.resolve(__dirname, './src/styles.scss')
	],
	output: {
		filename: '[name]-[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin([
			path.resolve(__dirname, 'dist')
		], {
			watch: true
		}),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: path.resolve(__dirname, './dist/index.html'),
			inject: false,
			templateParameters: (compilation, assets, options)=>{
				return {
					files: assets
				}
			}
		}),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{
					entry: 'mithril.min.js',
					module: 'mithril',
					global: 'm'
				}
			]
		})
	],
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							outputStyle: 'expanded',
							sourceMap: 'none'
						}
					}
				]
			}
		]
	}
}
