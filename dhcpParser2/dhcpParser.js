const dhcpOptions = require('./dhcpOptions')
const DhcpOption = require('./DhcpOptionClass')

function getOptions(buffer) {
    //console.log(buffer)
    const result = getNextOption(buffer)
    return result
    return {}
}

function getNextOption(buffer, offset = 0, accumulatedOptions = {}) {
    const optionNumber = DhcpOption.parseOptionNumber(buffer.slice(offset))
    const optionName = dhcpOptions[optionNumber].name
    if (optionName === 'END') return Object.assign({}, accumulatedOptions, {[optionName]: {}})
    const relatedBufferSlice = DhcpOption.getBufferSlice(buffer.slice(offset))
    const retrievedProperties = dhcpOptions[optionNumber].parse(relatedBufferSlice)
    const newAccumulatedOptions = Object.assign({}, accumulatedOptions, {[optionName]: retrievedProperties})
    return getNextOption(buffer, offset + 2 + DhcpOption.parseOptionSize(relatedBufferSlice), newAccumulatedOptions)
}

module.exports = {getOptions}