const bootpParser = require('./bootpParser/parseBootp')
const dhcpParser = require('./dhcpParser/dhcpParser')
const DHCP_OPTIONS_START_BYTE = 240

function parseDhcpPacket(packet) {
    return {
        bootp: bootpParser.parse(packet),
        dhcp: dhcpParser.getOptions(packet.slice(DHCP_OPTIONS_START_BYTE))
    }
}

function serializeDhcpPacket(packet) {
    const bootpBytes = bootpParser.serialize(packet)
    const dhcpBytes = dhcpParser.serializeOptions(packet.dhcp)
    const packetSize = bootpBytes.length + dhcpBytes.length
    const buffer = Buffer.concat(bootpBytes, dhcpBytes, packetSize)
    return buffer
}
module.exports = {parseDhcpPacket, serializeDhcpPacket}
