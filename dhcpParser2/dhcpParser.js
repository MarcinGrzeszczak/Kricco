const dhcpOptions = require('./dhcpOptions')
const DhcpOption = require('./DhcpOptionClass')

function getOptions(buffer) {
    //console.log(buffer)
    const result = getNextOption(buffer)
    console.log(result)
    return result
    return {}
}

function getNextOption(buffer, offset = 0, accumulatedOptions = {}) {
    const optionNumber = DhcpOption.parseOptionNumber(buffer.slice(offset))
    if (optionNumber === 255) return Object.assign({}, accumulatedOptions, {[optionNumber]: {}})
    const relatedBufferSlice = DhcpOption.getBufferSlice(buffer.slice(offset))
    //console.log(dhcpOptions[optionNumber].name, relatedBufferSlice)
    const retrievedProperties = dhcpOptions[optionNumber].parse(relatedBufferSlice)
    const newAccumulatedOptions = Object.assign({}, accumulatedOptions, {[optionNumber]: retrievedProperties})
    //console.log('newAccumulatedOptions', newAccumulatedOptions)
    console.log(newAccumulatedOptions)
    return getNextOption(buffer, offset + 2 + DhcpOption.parseOptionSize(relatedBufferSlice), newAccumulatedOptions)
}

module.exports = {getOptions}