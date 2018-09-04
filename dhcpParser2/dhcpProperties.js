const DhcpProperty = require('./DhcpPropertyClass')
const typesParsers = require('./typesParsers')
const _ = require('lodash')

const dhcpProperties = {
    MAXIUMUM_DHCP_MESSAGE_SIZE: {
        name: 'Maximum-DHCP-Message-Size',
        isList: false,
        typesParsers: typesParsers.uInt8
    },
    HOST_NAME: {
        name: 'Host-Name',
        isList: true,
        typesParsers: typesParsers.string
    },
    DHCP_MESSAGE_TYPE: {
        name: 'DHCP_Message_Type',
        isList: false,
        typesParsers: typesParsers.uInt8
    },
    VENDOR_CLASS_IDENTIFIER: {
        name: 'Vendor-class-identifier',
        isList: true,
        typesParsers: typesParsers.string
    },
    PARAMETER_REQUEST_LIST: {
        name: 'Parameter-Request-List',
        isList: true,
        typesParsers: typesParsers.uInt8
    },
    IPV4: {
        name: 'IPv4-Address',
        isList: false,
        typesParsers: typesParsers.ipv4
    },
    END: {
        name: 'END',
        isList: true,
        typesParsers: typesParsers.uInt8
    }
}

module.exports = _.mapValues(dhcpProperties, value => new DhcpProperty(value))