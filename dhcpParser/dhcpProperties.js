const DhcpProperty = require('./DhcpPropertyClass')
const protocolParsingUtils= require('../protocolParsingUtils')
const UNKNOWN_PROPERTY_LENGTH = DhcpProperty.getUnknownPropertyLengthSymbol()
module.exports = {
    PARAMETER_REQUEST_LIST:
        new DhcpProperty('Parameter Request List', UNKNOWN_PROPERTY_LENGTH, protocolParsingUtils.parseToListOf8UInts),
    IPV4:
        new DhcpProperty('IPv4 Address', 4, protocolParsingUtils.parseIp)
}