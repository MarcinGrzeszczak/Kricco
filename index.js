#!/usr/bin/env node
const dhcpServerCreator = require('./dhcpServerCreator')
const handleArguments = require('./cli/handleArguments')
const dhcpPacketParser_1 = require('./DhcpPacketParser_1')
const dhcpPacketParser_2 = require('./DhcpPacketParser_2')
const args = handleArguments()

const port = args.flags.port


function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message) {
    console.log('::::::::::::NEW MESSAGE::::::::::::')
    console.log(`Received message: \n${message}`)
    console.log(dhcpPacketParser_1(message))
    console.log(dhcpPacketParser_2(message))
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const dhcpServer = dhcpServerCreator(port, onError, onMessage, onServerListening)