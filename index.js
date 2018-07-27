const dhcpServerCreator = require('./dhcpServerCreator')

const DEFAULT_PORT = 67

const commandArgumentsList = process.argv.slice(2)

const commandArgumentsMap = {
    port: commandArgumentsList[0],
    closeAfterFirstPacket: commandArgumentsList[1],
    outputOnlyPackets: commandArgumentsList[2]
}

const port = commandArgumentsMap.port || DEFAULT_PORT

function onError(error) {
    if (!commandArgumentsMap.outputOnlyPackets) console.log(`Error occured ${error}`)
}

function onMessage(message, remoteAddressInformation) {
    if (!commandArgumentsMap.outputOnlyPackets)
        console.log(`Received message: ${message} from ${remoteAddressInformation.address}:${remoteAddressInformation.port}`)
    if (commandArgumentsMap.outputOnlyPackets) console.log(message)
    if (commandArgumentsMap.closeAfterFirstPacket === 'true') process.exit()
}

function onServerListening() {
    if (!commandArgumentsMap.outputOnlyPackets) console.log(`DHCP Server is listening on port ${port}`)
}

const dhcpServer = dhcpServerCreator(port, onError, onMessage, onServerListening)