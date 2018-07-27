
const server = require('dhcpjs').createServer()

const EVENTS = {
    ERROR: 'error',
    MESSAGE: 'message',
    LISTENING: 'listening'
}

function dhcpServerCreator(onErrorCallback, onMessageCallback, onListeningCallback) {
    server.on(EVENTS.ERROR, onErrorCallback)
    
    server.on(EVENTS.MESSAGE, onMessageCallback)
    
    server.on(EVENTS.LISTENING, onListeningCallback)

    server.bind()
    return server
}


module.exports = dhcpServerCreator