
function dhcpPacketLinesParser(buffer) {
    const step = 32
    let result = []
    for (let i = 0 ; i + step <= buffer.length ; i += step) {
        const dhcpLine = buffer.slice(i, i + offset)
        result.push(dhcpLine)
    }
    return result
}

module.exports = dhcpPacketLinesParser