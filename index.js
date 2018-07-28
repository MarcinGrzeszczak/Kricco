#!/usr/bin/env node
const dhcpServerCreator = require('./dhcpServerCreator')
const handleArguments = require('./cli/handleArguments')
const parseBootp = require('./parseBootp')
const args = handleArguments()

const port = args.flags.port


function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message) {
    console.log('::::::::::::NEW MESSAGE::::::::::::')
    console.log(parseBootp(message))
    console.log(`Received message: \n${message}`)
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const dhcpServer = dhcpServerCreator(port, onError, onMessage, onServerListening)