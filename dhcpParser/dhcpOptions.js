const DhcpOption = require('./DhcpOptionClass')
const DhcpOptionProperties = require('./dhcpProperties')

const OPTIONS = {
    HOST_NAME : {
        code: 12,
        name: 'Host-Name',
        properties: [
            DhcpOptionProperties.HOST_NAME
        ]
    },

    DHCP_MESSAGE_TYPE: {
        code: 53,
        name: 'DHCP-Message-Type',
        properties: [
            DhcpOptionProperties.DHCP_MESSAGE_TYPE
        ]
    },

    PARAMETER_REQUEST_LIST: {
        code: 55,
        name: 'Parameter-Request-list',
        properties: [
            DhcpOptionProperties.PARAMETER_REQUEST_LIST
        ]
    },

    MAXIMUM_DHCP_MESSAGE_SIZE: {
        code: 57,
        name: 'Maximum-DHCP-Message-Size',
        properties: [
            DhcpOptionProperties.MAXIMUM_DHCP_MESSAGE_SIZE
        ]
    },

    VENDOR_CLASS_IDENTIFIER: {
        code: 60,
        name: 'Vendor-class-identifier',
        properties: [
            DhcpOptionProperties.VENDOR_CLASS_IDENTIFIER
        ]
    },

    END : {
        code: 255,
        name: 'END',
        properties: []
    }
}

module.exports = OPTIONS