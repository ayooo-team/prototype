'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../webpack.dev.config.js');

const compiler = webpack(config);

const options = {
    contentBase: 'build/',
    hot: true,
    filename: 'bundle.js',
    stats: {
        colors: true
    }
};

const server = new WebpackDevServer(compiler, options);

server.listen(8008, 'localhost', function () {
    console.log('webpack-dev-server is running on ');
});
