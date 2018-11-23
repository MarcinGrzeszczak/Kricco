const _ = require('lodash')

const DhcpOption = require('./DhcpOptionClass')
const dhcpProperties = require('./dhcpProperties')

const OPTIONS = {
	1: {
		name: 'Subnet Mask',
		properties: [
			dhcpProperties.IPV4
		]
	},
	3: {
		name: 'List of IPv4 Addresses',
		properties: [
			dhcpProperties.LIST_OF_IP_ADDRESSES
		]
    },
    6: {
        name: 'Domain Name Server',
        properties: [
            dhcpProperties.LIST_OF_IP_ADDRESSES
        ]
    },
    12: {
        name: 'Host Name',
        properties: [
            dhcpProperties.TEXT
        ]
	},
	28: {
		name: 'Broadcast Address',
		properties: [
			dhcpProperties.IPV4
		]
    },
    
    50: {
        name: 'Request IP Address',
        properties: [
            dhcpProperties.IPV4
        ]
	},
	28: {
		name: 'Broadcast Address',
		properties: [
			dhcpProperties.IPV4
		]
	},
	51: {
		name: 'Address time',
		properties: [
			dhcpProperties.TIME_IN_SECONDS
		]
	},
    53: {
        name: 'DHCP Message Type',
        properties: [
            dhcpProperties.DHCP_MESSAGE_TYPE
        ]
    },
	54: {
		name: 'Server Identifier',
		properties: [
			dhcpProperties.IPV4
		]
	},
    55: {
        name: 'Parameter request list',
        properties: [
            dhcpProperties.PARAMETER_REQUEST_LIST
        ]
    },

    56: {
        name: 'Message',
        properties: [
            dhcpProperties.TEXT
        ]
    },

    57: {
      name: 'Maximum DHCP Message Size',
      properties: [
            dhcpProperties.MAXIUMUM_DHCP_MESSAGE_SIZE
      ]  
	},
	58: {
		name: 'Renewal (T1) Time Value', 
		properties: [
			dhcpProperties.TIME_IN_SECONDS
		]
	},
	59: {
		name: 'Rebinding (T2) Time Value',
		properties: [
			dhcpProperties.TIME_IN_SECONDS
		]
	},
    60: {
        name: 'Vendor class identifier',
        properties: [
            dhcpProperties.VENDOR_CLASS_IDENTIFIER
        ]
    },
    61: {
        name: 'Client-identifier',
        properties: [
            dhcpProperties.CLIENT_IDENTIFIER
        ]

    },    
    255: {
        name: 'END',
        properties: [
            dhcpProperties.END
        ]
    } 
}

const instantiatedOptions = _.mapValues(OPTIONS, option => new DhcpOption(option))
module.exports = instantiatedOptions