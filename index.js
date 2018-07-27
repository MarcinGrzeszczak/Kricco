const dhcpServerCreator = require('./dhcpServerCreator')

function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message, rinfo) {
    console.log(`Received message: ${message} from ${rinfo.address}:${rinfo.port}`)
}

function onServerListening() {
    console.log('DHCP Server is listening')
}

const dhcpServer = dhcpServerCreator(onError, onMessage, onServerListening)