var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';

config.plugins = [
    // 添加三个插件
    new webpack.optimize.OccurrenceOrderPlugin(), //webpack2.0比webpack21.0多一个r(OccurrenceOrderPlugin)
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
        filename: 'components/test.html',
        template: path.resolve(__dirname, './components/test.html'),
        inject: true
    })
];

// 动态向入口配置中注入 webpack-hot-middleware/client
// var devClient = 'webpack-hot-middleware/client';
var devClient = './dev-client';
Object.keys(config.entry).forEach(function(name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})


module.exports = config;