const Socket = require('net').Socket

process.on('message', (params) => {
    let { host, port, localAddress } = params
    let client = new Socket()

    client.connect({
        port,
        host,
        localAddress
    }, () => {
        process.send(`get new task`)
    })
});