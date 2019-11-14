const server = require('./server')
const client = require('./client')
const listIp = require('./list-ip')

module.exports = async () => { };

const program = require('commander')

program
    .option('-s, --server [port]', '运行 TCP 服务器，默认端口 5000')
    .option('-c, --client [ip,port]', '运行 TCP 客户端，默认服务器 localhost，端口 5000')
    .option('-l, --list', '显示当前系统绑定的ip地址列表')
program.version('0.0.1')

program.parse(process.argv)

if (program.server) {
    let port = program.server
    if (port == true) {
        port = 5000
    }
    server.run(port)
} else if (program.client) {
    let server = program.client
    let port = 5000
    if (server == true) {
        server = 'localhost'
    } else {
        let params = server.split(',')
        server = params[0]
        port = parseInt(params[1])
    }
    client.run(server, port)
} else if (program.list) {
    listIp.run()
}