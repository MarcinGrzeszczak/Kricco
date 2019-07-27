#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')

const udpServerCreator = require('./udpServerCreator')
const handleArguments = require('./cli/handleArguments')
const parseDhcpPacket = require('./parser/parseDhcpPacket')
const createDhcpError = require('./createDhcpError')
const args = handleArguments()

const port = args.flags.port || args.flags.p
const fileToParse = args.flags.fileToParse || args.flags.f


if (fileToParse) {
    const dhcpPacket = fs.readFileSync(path.resolve(fileToParse))
    const parsingResult = parseDhcpPacket.parseDhcpPacket(dhcpPacket)
    console.log(util.inspect(parsingResult, {showHidden: false, depth: null}))
} else {
    const server = udpServerCreator(port, onError, onMessage, onServerListening)

    function onError(error) {
        console.log(`Error occured ${error}`)
    }
    
    function onMessage(message, rfinfo) {
        console.log('::::::::::::NEW MESSAGE::::::::::::')
        const parsingResult = parseDhcpPacket.parseDhcpPacket(message)
        console.log(util.inspect(parsingResult, {showHidden: false, depth: null}))
        console.log(rfinfo)
        server.setBroadcast(true);
        const error = createDhcpError()
        server.send(error, 0, error.length, rfinfo.port, "192.168.0.255");
    }
    
    function onServerListening() {
        console.log(`DHCP Server is listening on port ${port}`)
    }
}


