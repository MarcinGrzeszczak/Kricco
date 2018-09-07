#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')

const udpServerCreator = require('./udpServerCreator')
const handleArguments = require('./cli/handleArguments')
const parseDhcpPacket = require('./parseDhcpPacket')
const args = handleArguments()

const port = args.flags.port
const fileToParse = args.flags.fileToParse


if (fileToParse) {
    const dhcpPacket = fs.readFileSync(path.resolve(fileToParse))
    const parsingResult = parseDhcpPacket(dhcpPacket)
    console.log(util.inspect(parsingResult, {showHidden: false, depth: null}))
    process.exit(0)
}


udpServerCreator(port, onError, onMessage, onServerListening)

function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message) {
    console.log('::::::::::::NEW MESSAGE::::::::::::')
    const parsingResult = parseDhcpPacket(message)
    console.log(util.inspect(parsingResult, {showHidden: false, depth: null}))
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}