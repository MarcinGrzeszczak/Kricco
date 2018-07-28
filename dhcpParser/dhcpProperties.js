const DhcpOptionProperty = require('./DhcpOptionPropertyClass')
const protocolParsingUtils= require('../protocolParsingUtils')
module.exports = {
    LENGTH:
        new DhcpOptionProperty('length', protocolParsingUtils.parseTo8UInt),
    PARAMETER_REQUEST_LIST:
        new DhcpOptionProperty('Parameter Request List', protocolParsingUtils.parseToListOf8UInts)
}