const path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		background: "./ts/background.ts",
		content: "./ts/content.ts",
		options: "./ts/options.ts"
	},
	mode: "none",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		filename: "./[name]/[name].js",
		path: path.resolve(__dirname, 'extension')
	}
};
