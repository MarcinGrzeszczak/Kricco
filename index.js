#!/usr/bin/env node
const udpServerCreator = require('./udpServerCreator')
const handleArguments = require('./cli/handleArguments')
const parseBootp = require('./bootpParser/parseBootp')
const dhcpParser = require('./dhcpParser/dhcpParser')
const args = handleArguments()

const port = args.flags.port


function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message) {
    console.log('::::::::::::NEW MESSAGE::::::::::::')
    console.log(parseBootp(message))
    console.log(dhcpParser(message.slice(240)))
    console.log(`Received message: \n${message}`)
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const udpServer = udpServerCreator(port, onError, onMessage, onServerListening)