const DhcpOption = require('./DhcpOptionClass')
const DhcpOptionProperties = require('./dhcpProperties')

const OPTIONS = {
    53: new DhcpOption(
        'DHCP Message Type',
        [
            DhcpOptionProperties.IPV4
        ]
    ),
    55: new DhcpOption(
        'Parameter Request List',
        [
            DhcpOptionProperties.PARAMETER_REQUEST_LIST
        ]
    )
}

module.exports = OPTIONS