const bootpParser = require('./bootpParser/parseBootp')
const dhcpParser = require('./dhcpParser/dhcpParser')
const {logger} = require('../logger')
const DHCP_OPTIONS_START_BYTE = 240


function parseDhcpPacket(packet) {
    logger.debug(`Beginning parsing procedure of the followind packet data: ${packet.toString('hex')}`)
    return {
        bootp: bootpParser.parse(packet),
        dhcp: dhcpParser.getOptions(packet.slice(DHCP_OPTIONS_START_BYTE))
    }
}

function serializeDhcpPacket(packet) {
    logger.debug(`Beginning serializing procedure of the followind packet data: ${packet}`)
    const bootpBytes = bootpParser.serialize(packet)
    const dhcpBytes = dhcpParser.serializeOptions(packet.dhcp)
    const packetSize = bootpBytes.length + dhcpBytes.length
    const buffer = Buffer.concat(bootpBytes, dhcpBytes, packetSize)
    logger.debug(`DHCP Packet serialized, result:`)
    logger.debug(buffer.toString('hex'))
    return buffer
}
module.exports = {parseDhcpPacket, serializeDhcpPacket}
