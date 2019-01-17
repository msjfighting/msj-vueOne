const path = require('path')
// 启动热更新的第二步
const webpack = require('webpack')
const htmlWebpacklugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

var proxy = require('http-proxy-middleware');

module.exports = {
    entry:path.join(__dirname,'./src/main.js'), // 入口,表示要使用webpack打包哪个文件
    output:{ // 输出文件相关的配置
        path:path.join(__dirname,'./dist'), // 指定打包好的文件,输出到哪个目录中去
        filename:'bundle.js'  // 这是指定输出文件名称
    },
    devServer:{
        // 这是设置Dev-sever命令参数的第二种方式,相对来说,这种方式麻烦一些
        open:true,//自动打开浏览器
        port:8081,//设置启动时候的运行端口号
        contentBase:'src', //指定托管目录
        hot:true, // 启动热更新的第一步,
        // host:'10.1.3.13',
        inline: true, // 实时刷新
        proxy: {
            '/api': { // api表示当前项目请求的key
              target: 'http://kk6923.cn', // 代理服务器路径
              pathRewrite: {'^/api' : './'}, // 重写路径
              changeOrigin: true
            },
            '/qingtaoke': { // api表示当前项目请求的key
                target: 'http://openapi.qingtaoke.com', // 代理服务器路径
                pathRewrite: {'^/qingtaoke' : './'}, // 重写路径
                changeOrigin: true
              },
              '/jianshu': { // api表示当前项目请求的key
                target: 'https://www.jianshu.com', // 代理服务器路径
                pathRewrite: {'^/jianshu' : './'}, // 重写路径
                changeOrigin: true
              }
              
          }
    },
    plugins:[ //配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象 这是第三步,启动热更新
        new htmlWebpacklugin({
            template:path.join(__dirname,'./src/index.html'), //指定模板页面,将来会根据指定的页面路径去除生产内存中的页面
            filename: 'index.html' // 指定生成的页面名称
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
    ],
    module:{// 用于所有第三方模块加载器
        rules:[ // 所有第三方模块的匹配规则
            {test:/\.css$/,use:[{loader:'style-loader'},{loader:'css-loader'}]},
            {test:/\.less$/,use:[{loader:'style-loader'},{loader:'css-loader'},{loader:'less-loader'}]},
            {test:/\.scss$/,use:[{loader:'style-loader'},{loader:'css-loader'},{loader:'sass-loader'}]},
            {test:/\.(jpg|png|gif|bmp|jpeg)/,use:['url-loader']}, // 处理图片路径的loader ?limit=17817&name=[hash:8]-[name].[ext]
            // limit给定的值,是图片大小,单位是byte,如果我们引用的图片,大于或者等于给定的limit值,就不会被转成base64,否则将转为base64
            {test:/\.(ttf|eot|svg|woff|woff2)/,use:['url-loader']},
            // 配置Babel来转换高级JS语法
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test:/\.vue$/,use:'vue-loader'}, // 处理.vue的loader
        ]
    }
}
