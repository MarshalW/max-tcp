const net = require('net')

const ADDRESS = '0.0.0.0'

module.exports = {
    run(port) {
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
        console.log(`TCP server started at ${port}.`)
    }
}