#!/usr/bin/env node


const dhcpServerCreator = require('./dhcpServerCreator')
const packageParser = require('./packageParser')
const handleArguments = require('./cli/handleArguments')
const args = handleArguments()

const port = args.flags.port

function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message, remoteAddressInformation) {
    console.log(`Received message: ${packageParser(message)} from ${remoteAddressInformation.address}:${remoteAddressInformation.port}`)
    console.log(message)
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const dhcpServer = dhcpServerCreator(port, onError, onMessage, onServerListening)