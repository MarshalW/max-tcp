const ipArray = require(`./list-ip`).list()
const os = require('os')
const fork = require('child_process').fork;
const workerCount = os.cpus().length

const MAX_CONNECTIONS = 64000

const path = require('path')
const appDir = path.dirname(require.main.filename);

module.exports = {
    run(host, port) {
        let tasks = []

        for (let i = 0; i < MAX_CONNECTIONS; i++) {
            ipArray.forEach(ip => {
                tasks.push(ip)
            })
        }

        let workers = []
        let taskCount = 0

        const sendTask = worker => {
            if (tasks.length > 0) {
                worker.send({
                    host,
                    port,
                    localAddress: tasks.shift()
                })
            }
        }

        for (let i = 0; i < workerCount; i++) {
            let worker = fork(`${appDir}/../lib/worker.js`)
            workers.push(worker)

            worker.on('message', (message) => {
                taskCount++
                console.log(`Connected ${taskCount}`)
                sendTask(worker)
            })

            sendTask(worker)
        }

        console.time('Client run')


        const exitProcess = () => {
            console.timeEnd('Client run')
            process.exit()
        }

        process.on('SIGTERM', exitProcess)
        process.on('SIGINT', exitProcess)
    }
}