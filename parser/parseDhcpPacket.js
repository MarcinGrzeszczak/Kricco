const bootpParser = require('./bootpParser/parseBootp')
const dhcpParser = require('./dhcpParser/dhcpParser')
const DHCP_OPTIONS_START_BYTE = 240

function parseDhcpPacket(packet) {
    return {
        bootp: bootpParser(packet),
        dhcp: dhcpParser.getOptions(packet.slice(DHCP_OPTIONS_START_BYTE))
    }
}
module.exports = parseDhcpPacket
