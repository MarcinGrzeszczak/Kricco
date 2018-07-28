const LINES = [
    'OP, HLEN, HTYPE, HOPS',
    'XID',
    'SECS, FLAGS',
    'CIADDR',
    'YIADDR',
    'SIADDR', 
    'GIADDR',
    'CHADDR:1',
    'CHADDR:2',
    'CHADDR:3',
    'CHADDR:4',
    'MAGGIC COOKIE'
]


function dhcpPacketLinesParser(buffer) {
    const step = 4
    let result = []
    for (let i = 0 ; i + step <= buffer.length ; i += step) {
        const dhcpLine = buffer.slice(i, i + step)
        console.log('Line: ', LINES[i], dhcpLine)
        result.push(dhcpLine)
    }
    return result
}

module.exports = dhcpPacketLinesParser