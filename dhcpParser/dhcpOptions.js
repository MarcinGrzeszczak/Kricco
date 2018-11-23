const _ = require('lodash')

const DhcpOption = require('./DhcpOptionClass')
const dhcpProperties = require('./dhcpProperties')

const OPTIONS = {
	1: {
		name: 'Subnet Mask',
		properties: [
			dhcpProperties.SUBNET_MASK
		]
	},
    12: {
        name: 'Host Name',
        properties: [
            dhcpProperties.HOST_NAME
        ]
	},
	28: {
		name: 'Broadcast Address',
		properties: [
			dhcpProperties.BROADCAST_ADDRESS
		]
	},
	51: {
		name: 'Address time',
		properties: [
			dhcpProperties.ADDRESS_TIME
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
			dhcpProperties.SERVER_IDENTIFIER
		]
	},
    55: {
        name: 'Parameter request list',
        properties: [
            dhcpProperties.PARAMETER_REQUEST_LIST
        ]
    },

    57: {
      name: 'Maximum DHCP Message Size',
      properties: [
            dhcpProperties.MAXIUMUM_DHCP_MESSAGE_SIZE
      ]  
	},
	59: {
		name: 'Rebinding (T2) Time Value',
		properties: [
			dhcpProperties.REBINDING_TIME_VALUE
		]
	},
    60: {
        name: 'Vendor class identifier',
        properties: [
            dhcpProperties.VENDOR_CLASS_IDENTIFIER
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