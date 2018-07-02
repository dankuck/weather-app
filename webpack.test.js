const merge = require('webpack-merge');
const common = require('./webpack.conf.js');

module.exports = merge(common, {
    devtool: 'inline-cheap-module-source-map'
});
