const DhcpOption = require('./DhcpOptionClass')
const DhcpOptionProperties = require('./dhcpProperties')

const OPTIONS = {

    53: new DhcpOption(
        'DHCP Message Type',
        [
            DhcpOptionProperties.DHCP_MESSAGE_TYPE
        ]
    ),

    60: new DhcpOption(
        'Vendor class identifier',
        [
            DhcpOptionProperties.VENDOR_CLASS_IDENTIFIER
        ]
    ),
    
    255: new DhcpOption(
        'END',
        [
            DhcpOptionProperties.END
        ]
    )
}

module.exports = OPTIONS