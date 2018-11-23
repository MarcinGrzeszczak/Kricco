const _ = require('lodash')

const DhcpProperty = require('./DhcpPropertyClass')
const typesParsers = require('./typesParsers')
const FORMATTERS = require('./formatters')

const dhcpProperties = {
	SUBNET_MASK: {
		name: 'Subnet Mask',
		isList: false,
		typeParser: typesParsers.ipv4
	},
	REBINDING_TIME_VALUE: {
		name: 'Rebinding-Time-Value',
		isList: false,
		typeParser: typesParsers.uInt32
	},
	SERVER_IDENTIFIER: {
		name: 'Server-Identifier',
		isList: false,
		typeParser: typesParsers.ipv4
	},
	ADDRESS_TIME: {
		name: 'IP-Adress-Lease-Time',
		isList: false,
		typeParser: typesParsers.uInt32
	},
    MAXIUMUM_DHCP_MESSAGE_SIZE: {
        name: 'Maximum-DHCP-Message-Size',
        isList: false,
        typeParser: typesParsers.uInt16
    },
    HOST_NAME: {
        name: 'Host-Name',
        isList: true,
        typeParser: typesParsers.utf8,
        formatter: FORMATTERS.JOIN
    },
    DHCP_MESSAGE_TYPE: {
        name: 'DHCP-Message-Type',
        isList: false,
        typeParser: typesParsers.uInt8
    },
    VENDOR_CLASS_IDENTIFIER: {
        name: 'Vendor-class-identifier',
        isList: true,
        typeParser: typesParsers.utf8,
        formatter: FORMATTERS.JOIN
    },
    PARAMETER_REQUEST_LIST: {
        name: 'Parameter-Request-List',
        isList: true,
        typeParser: typesParsers.uInt8,
        formatter: FORMATTERS.NONE
    },
    IPV4: {
        name: 'IPv4-Address',
        isList: false,
        typeParser: typesParsers.ipv4
    },
    END: {
        name: 'END',
        isList: true,
        typeParser: typesParsers.end
    }
}

const instantiatedProperties = _.mapValues(dhcpProperties, value => new DhcpProperty(value))
module.exports = instantiatedProperties 