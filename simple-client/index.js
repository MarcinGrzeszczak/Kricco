const dgram = require('dgram');
const fs = require('fs');
const path = require('path');

const discoveryMsg = fs.readFileSync(path.resolve(__dirname, '../mocks/dhcpDiscovery.bin'));
const socket = dgram.createSocket('udp4', onMessageReceived);

socket.bind(68);

socket.send(discoveryMsg, 0, discoveryMsg.length, 67, 'localhost', () => {
    console.log('msg send');
});

function onMessageReceived(msg) {
    console.log('message received');
    console.log(msg);
}
