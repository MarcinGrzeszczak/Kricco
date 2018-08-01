const DhcpOption = require('./DhcpOptionClass')
const DhcpOptionProperties = require('./dhcpProperties')

const OPTIONS = {
    12: new DhcpOption(
        'Host Name',
        [
            DhcpOptionProperties.HOST_NAME
        ]
    ),

    53: new DhcpOption(
        'DHCP Message Type',
        [
            DhcpOptionProperties.DHCP_MESSAGE_TYPE
        ]
    ),

    55: new DhcpOption(
        'Parameter request list',
        [
            DhcpOptionProperties.PARAMETER_REQUEST_LIST
        ]
    ),

    57: new DhcpOption(
      'Maximum DHCP Message Size',
      [
        DhcpOptionProperties.MAXIMUM_DHCP_MESSAGE_SIZE
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