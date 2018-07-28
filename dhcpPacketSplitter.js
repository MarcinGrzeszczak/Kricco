
function dhcpPacketLinesParser(buffer) {
    const step = 32
    let result = []
    for (let i = 0 ; i + step <= buffer.length ; i += step) {
        console.log('Reading from offset:', i)
        const dhcpLine = buffer.slice(i, i + step)
        result.push(dhcpLine)
    }
    return result
}

module.exports = dhcpPacketLinesParser