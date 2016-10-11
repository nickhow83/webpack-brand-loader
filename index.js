const fs = require('fs');
const loaderUtils = require('loader-utils');
const chalk = require('chalk');

var messageDisplayed = false;

module.exports = function (source) {
	var filePath = this.resource;
	var callback = this.async();
	
	var brand = process.env.WEBPACK_BRAND;
	
	if (brand) {
		if (!messageDisplayed) {
			console.log(chalk.green(`webpack-brand-loader: Using brand "${brand}"`));
			messageDisplayed = true;
		}
		
		try {
			var pathRegex = /\.[^.]+$/;
			var extension = filePath.match(pathRegex)[0];
			filePath = filePath.replace(pathRegex, `.${brand}${extension}`);
			
			var stats = fs.statSync(filePath);
			if (!stats.isFile()) {
				filePath = this.resource;
			}
		} catch (e) {
			filePath = this.resource;
		}
	} else {
		if (!messageDisplayed) {
			console.log(chalk.yellow('webpack-brand-loader: Environment variable "WEBPACK_BRAND" has not been set, using default (no brand).'));
			messageDisplayed = true;
		}
	}
	
	fs.readFile(filePath, 'utf-8', function(err, fileContents) {
		callback(null, fileContents);
	});
}