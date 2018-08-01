const DhcpProperty = require('./DhcpPropertyClass')
const protocolParsingUtils= require('../protocolParsingUtils')
const UNKNOWN_PROPERTY_LENGTH = DhcpProperty.getUnknownPropertyLengthSymbol()
module.exports = {
    MAXIMUM_DHCP_MESSAGE_SIZE:
        new DhcpProperty('Maximum-DHCP-Message-Size',2, protocolParsingUtils.parseTo16UInt),

    HOST_NAME:
        new DhcpProperty('Host-Name', UNKNOWN_PROPERTY_LENGTH, protocolParsingUtils.parseToString),

    DHCP_MESSAGE_TYPE: 
        new DhcpProperty('DHCP-Message-Type',1, protocolParsingUtils.parseTo8UInt),

    VENDOR_CLASS_IDENTIFIER:
        new DhcpProperty('Vendor-class-identifier', UNKNOWN_PROPERTY_LENGTH,protocolParsingUtils.parseToString),
    
    PARAMETER_REQUEST_LIST:
        new DhcpProperty('Parameter-Request-List', UNKNOWN_PROPERTY_LENGTH, protocolParsingUtils.parseToListOf8UInts),
    IPV4:
        new DhcpProperty('IPv4-Address', 4, protocolParsingUtils.parseIp),
    END:
        new DhcpProperty('END',0,protocolParsingUtils.parseToListOf8UInts)
}