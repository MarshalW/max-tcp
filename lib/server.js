const net = require('net')
const cluster = require('cluster')
const os = require('os')
const workerCount = os.cpus().length

const ADDRESS = '0.0.0.0'

module.exports = {
    run(port) {
        if (cluster.isMaster) {
            console.log(`TCP server started at ${port}.`)

            for (let i = 0; i < workerCount; i++) {
                cluster.fork()
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`)
            })

            console.time('Server run')

            const exitProcess = () => {
                console.timeEnd('Server run')
                process.exit()
            }

            process.on('SIGTERM', exitProcess)
            process.on('SIGINT', exitProcess)
        } else {
            let server = net.createServer(socket => {
                console.log(`Client connected, ${socket.remoteAddress}:${socket.remotePort}`)

                socket.on('error', error => {
                    console.log(`${error}, ${socket.remoteAddress}:${socket.remotePort}`)
                    socket.destroy()
                })
            }).on('error', error => {
                throw error;
            })

            server.listen(port, ADDRESS)
        }
    }
}