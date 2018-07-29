#!/usr/bin/env node
const udpServerCreator = require('./udpServerCreator')
const handleArguments = require('./cli/handleArguments')
const parseBootp = require('./bootpParser/parseBootp')
const dhcpParser = require('./dhcpParser/dhcpParser')
const args = handleArguments()
const fs = require('fs');
const port = args.flags.port


function onError(error) {
    console.log(`Error occured ${error}`)
}

function onMessage(message) {
    console.log('::::::::::::NEW MESSAGE::::::::::::')
    
    fs.writeFile('../dhcpDiscoveryPacketExample', message, function(err) {
        if(err) return console.log(err)

        console.log("The file was saved!")
        process.exit()
    })
    //console.log(parseBootp(message))
    //console.log(dhcpParser.getOptions(message.slice(240)))
    console.log(`Received message: \n${message}`)
}

function onServerListening() {
    console.log(`DHCP Server is listening on port ${port}`)
}

const udpServer = udpServerCreator(port, onError, onMessage, onServerListening)