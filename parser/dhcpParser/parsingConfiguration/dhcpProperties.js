/*
    A DHCP Properties is not an entity specified in the official DHCP documentation. In Kricco they
    represent DHCP Options payload.
*/

const _ = require('lodash')

const DhcpProperty = require('./configurationClasses/DhcpPropertyClass')
const typesParsers = require('./typesParsers')
const FORMATTERS = require('./formatters')

const dhcpProperties = {
	LIST_OF_IP_ADDRESSES: {
		name: 'List-Of-Ip-Addresses',
		isList: true,
		typeParser: typesParsers.ipv4
	},
	TIME_IN_SECONDS: {
		name: 'Time-In-Seconds',
		isList: false,
		typeParser: typesParsers.uInt32
	},
    MAXIUMUM_DHCP_MESSAGE_SIZE: {
        name: 'Maximum-DHCP-Message-Size',
        isList: false,
        typeParser: typesParsers.uInt16
    },
    TEXT: {
        name: 'Text',
        isList: true,
        typeParser: typesParsers.utf8,
        formatter: FORMATTERS.JOIN
    },
    DHCP_MESSAGE_TYPE: {
        name: 'DHCP-Message-Type',
        isList: false,
        typeParser: typesParsers.dhcpMessageType
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
    CLIENT_IDENTIFIER: {
        name: 'Client-Identifier',
        isList: true,
        typeParser: typesParsers.hex,
        formatter: FORMATTERS.JOIN
    },
    END: {
        name: 'END',
        isList: true,
        typeParser: typesParsers.end
    }
}

const instantiatedProperties = _.mapValues(dhcpProperties, value => new DhcpProperty(value))
module.exports = instantiatedProperties 