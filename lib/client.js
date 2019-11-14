const ipArray = require(`./list-ip`).list()
const net = require('net')

const INTERVAL = 10
const MAX_CONNECTIONS = 64000

module.exports = {
    run(ip, port) {
        const clients = []
        setInterval(() => {
            if (clients.length <= MAX_CONNECTIONS * ipArray.length - 1) {
                let client = new net.Socket()

                client.connect({
                    port: port,
                    host: ip,
                    localAddress: ipArray[clients.length % ipArray.length]
                }, () => {
                    clients.push(client)
                    console.log(`Connected ${clients.length}`)
                })
            }

        }, INTERVAL)
    }
}