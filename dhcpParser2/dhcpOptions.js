const DhcpOption = require('./DhcpOptionClass')
const dhcpProperties = require('./dhcpProperties')

const OPTIONS = {
    12: new DhcpOption(
        'Host Name',
        [
            dhcpProperties.HOST_NAME
        ]
    ),

    53: new DhcpOption(
        'DHCP Message Type',
        [
            dhcpProperties.DHCP_MESSAGE_TYPE
        ]
    ),

    55: new DhcpOption(
        'Parameter request list',
        [
            dhcpProperties.PARAMETER_REQUEST_LIST
        ]
    ),

    57: new DhcpOption(
      'Maximum DHCP Message Size',
      [
            dhcpProperties.MAXIMUM_DHCP_MESSAGE_SIZE
      ]  
    ),
    60: new DhcpOption(
        'Vendor class identifier',
        [
            dhcpProperties.VENDOR_CLASS_IDENTIFIER
        ]
    ),    
    255: new DhcpOption(
        'END',
        [
            dhcpProperties.END
        ]
    )
}

module.exports = OPTIONS