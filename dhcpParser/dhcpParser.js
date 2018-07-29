const DhcpOption = require('./DhcpOptionClass')
const dhcpOptions = require('./dhcpOptions')

const META_DATA_LENGTH = 2

module.exports = {
    getOptions
}

function getOptions(dhcpOptionsPayload) {
    let nonParsedPayload = dhcpOptionsPayload
    let options = []
    while(nonParsedPayload.length) {
        const {skippedPayload, parsedOption} = parseNextOption(nonParsedPayload)
        options.push(parsedOption)
        nonParsedPayload = skippedPayload
    }
    return options
}

function parseNextOption(payloadToParse) {
    const optionMetaData = DhcpOption.parseMetaData(payloadToParse)
    if (!dhcpOptions[optionMetaData.code]) return {skippedPayload: payloadToParse, parsedOption: {}}
    const parsedOption = dhcpOptions[optionMetaData.code].parsePayload(optionMetaData, nonParsedPayload)
    const skippedPayload = payloadToParse.slice(0, optionMetaData.payloadLength + META_DATA_LENGTH)
    return {skippedPayload, parsedOption}
}
