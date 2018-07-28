
function dhcpPacketLinesParser(buffer) {
    const step = 32
    let result = []
    for (let i = 0 ; i + step <= buffer.length ; i += step) {
        const dhcpLine = buffer.slice(i, i + step)
        console.log('Line: ', i, dhcpLine)
        result.push(dhcpLine)
    }
    return result
}

module.exports = dhcpPacketLinesParser