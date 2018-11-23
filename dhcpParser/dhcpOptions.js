const _ = require('lodash')

const DhcpOption = require('./DhcpOptionClass')
const dhcpProperties = require('./dhcpProperties')

const OPTIONS = {
    12: {
        name: 'Host Name',
        properties: [
            dhcpProperties.HOST_NAME
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