const dhcpOptions = require('./dhcpOptions')
const DhcpOption = require('./DhcpOptionClass')

function getOptions(buffer) {
    return getNextOption(buffer)
    return {}
}

function getNextOption(buffer, offset = 0, accumulatedOptions = {}) {
    if (offset >= buffer.length) return accumulatedOptions
    const relatedBufferSlice = DhcpOption.getBufferSlice(buffer.slice(offset))
    console.log(relatedBufferSlice)
    const optionNumber = DhcpOption.parseOptionNumber(relatedBufferSlice)
    const retrievedProperties = dhcpOptions[optionNumber].parse(relatedBufferSlice)
    const newAccumulatedOptions = Object.assign({}, accumulatedOptions, {[optionNumber]: retrievedProperties})
    console.log('newAccumulatedOptions', newAccumulatedOptions)
    return getNextOption(buffer, nextOffset, newAccumulatedOptions)
}

module.exports = {getOptions}