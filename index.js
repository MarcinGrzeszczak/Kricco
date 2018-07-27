const dhcpServerCreator = require('./dhcpServerCreator')

const commandArguments = process.argv.slice(2)
const port = commandArguments[0] || 67

function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message, rinfo) {
    console.log(`Received message: ${message} from ${rinfo.address}:${rinfo.port}`)
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const dhcpServer = dhcpServerCreator(port, onError, onMessage, onServerListening)