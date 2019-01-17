app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); // 可以带cookies
    if(req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// 导入http内置模块
const http = reqire('http')

// 创建一个http的服务器
const server = http.createServer()

// 监听http服务器的request请求
server.on('request',function (reg,res) {
     const url = reg.url
    if (url === '/getscript'){
        // 拼接一个合法的JS脚本,这里拼接的是一个方法的调用
        var scriptStr = 'show()'
        // res,end 发送给客户端 客户端去把这个字符串当做JS代码去解析执行
        res.end(scriptStr)
    }else{
        res.end('404')
    }
})

server.listen(8080,function () {
     console.log('server listen at gttp://127.0.0.1:8080');

})
