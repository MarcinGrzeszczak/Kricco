const dhcpServerCreator = require('./dhcpServerCreator')

const DEFAULT_PORT = 67

const commandArgumentsList = process.argv.slice(2)

const commandArgumentsMap = {
    port: commandArgumentsList[0]
}

const port = commandArgumentsMap.port || DEFAULT_PORT

function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message, remoteAddressInformation) {
    console.log(`Received message: ${message} from ${remoteAddressInformation.address}:${remoteAddressInformation.port}`)
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const dhcpServer = dhcpServerCreator(port, onError, onMessage, onServerListening)