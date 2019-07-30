#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const winston = require('winston')

const udpServerCreator = require('./udpServerCreator')
const handleArguments = require('./cli/handleArguments')
const parseDhcpPacket = require('./parser/parseDhcpPacket')
const args = handleArguments()

const {logger, transports} = require('./logger')

const port = args.flags.port || args.flags.p
const fileToParse = args.flags.fileToParse || args.flags.f
const fileToSerialize = args.flags.fileToSerialize || args.flags.s
const debug = args.flags.debug || args.flags.d


 if (!debug) transports.console.level = 'info'
logger.info('Running Kricco')


if (fileToParse) {
    logger.info(`Parsing ${fileToParse}`)
    const dhcpPacket = fs.readFileSync(path.resolve(fileToParse))
    logger.info(`Input:`)
    logger.info(dhcpPacket)
    const parsingResult = parseDhcpPacket.parseDhcpPacket(dhcpPacket)
    logger.info(parsingResult)
} else if (fileToSerialize) {
    logger.info(`Serializing ${fileToSerialize}`)
    logger.info(`Input:`)
    
    const dhcpPacket = require(fileToSerialize)
    logger.info(dhcpPacket)
    const serializingResults = parseDhcpPacket.serializeDhcpPacket(dhcpPacket)
    logger.info(`Result:`)
    logger.info(serializingResults.toString('hex'))
} else {
    udpServerCreator(port, onError, onMessage, onServerListening)

    function onError(error) {
        logger.error(`Error occured ${error}`)
    }
    
    function onMessage(message) {
        logger.info('::::::::::::NEW MESSAGE::::::::::::')
        const parsingResult = parseDhcpPacket.parseDhcpPacket(message)
        logger.info(parsingResult)
    }
    
    function onServerListening() {
        logger.info(`DHCP Server is listening on port ${port}`)
    }
}


