const dgram = require('dgram')
const server = dgram.createSocket('udp4')

//67 is used by client, 68 by server
const PORT = 1068



const EVENTS = {
    ERROR: 'error',
    MESSAGE: 'message',
    LISTENING: 'listening'
}

function dhcpServerCreator(onErrorCallback, onMessageCallback, onListeningCallback) {
    server.on(EVENTS.ERROR, onErrorCallback)
    
    server.on(EVENTS.MESSAGE, onMessageCallback)
    
    server.on(EVENTS.LISTENING, onListeningCallback)

    server.bind(PORT)
    return server
}


module.exports = dhcpServerCreator