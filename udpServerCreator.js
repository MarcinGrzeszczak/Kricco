
const dgram = require('dgram')
const server = dgram.createSocket('udp4')

const EVENTS = {
    ERROR: 'error',
    MESSAGE: 'message',
    LISTENING: 'listening'
}

function dhcpServerCreator(port, onErrorCallback, onMessageCallback, onListeningCallback, onConnectCallback) {
    server.on(EVENTS.ERROR, onErrorCallback)
    
    server.on(EVENTS.MESSAGE, onMessageCallback)
    
    server.on(EVENTS.LISTENING, onListeningCallback)

    server.on('connect', onConnectCallback)

    server.bind(port)
    return server
}


module.exports = dhcpServerCreator