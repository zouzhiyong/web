// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        index: path.resolve(__dirname, './components/app/index/index.js')
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, './components/output/static'),
        publicPath: 'static/',
        filename: '[name].js', //'[name].[hash].js'
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.css', '.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(__dirname, './components/app/index/index.html'),
            inject: true
        })
    ]
}