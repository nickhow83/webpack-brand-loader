# webpack-brand-loader

## what is it?
It's used to apply theming and brands and to select alternate files, based on an environment variable setting.

## how do I use it?
First you need to install the library:
`npm i --save-dev webpack-brand-loader`

Set the environment variable: **WEBPACK_BRAND**.

Add the loader to your webpack config:
``` JavaScript
var config = {
	module: {
    	loaders: [
        	{ test: /\.less$/, loader: "style!css!postcss!less!webpack-brand" },
        ]
    }
}
```

In this example, webpack-brand-loader is used to select less files based on the environment variable. ** It should always be the right-most loader as it pushes that file through the rest of the loaders**.

## so what does this do?
In the above example, if you set a WEBPACK_BRAND of mybrand, when you have the following tree structure:
- root
 - component-a
   - component-a.less
   - component-a.mybrand.less
 - component-b
   - component-b.less

The loader will pass in to the less-loader the following files:
- component-a.mybrand.less
- component-b.less

Rather than throwing an error when there is no .mybrand.less file, the loader will default to the .less file.

## what file types does the loader support
At the minute, the loader can be used for loading all file types, so you could do something similar for .ts, .html, .css, .less, .*

## known issues
The only issue found so far is piping the output from the loader into the babel-loader.  Fortunately, we have done most of the development in TypeScript, and the only file types we are currently pushing through to babel are JavaScript (.js) source files.