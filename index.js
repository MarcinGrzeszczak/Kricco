#!/usr/bin/env node
const dhcpServerCreator = require('./dhcpServerCreator')
const packageParser = require('./packageParser')
const handleArguments = require('./cli/handleArguments')
const args = handleArguments()

const port = args.flags.port


function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message) {
    console.log(`Received message: ${message}`)
    console.log(message)
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const dhcpServer = dhcpServerCreator(onError, onMessage, onServerListening)