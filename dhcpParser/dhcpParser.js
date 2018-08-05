const DhcpOption = require('./DhcpOptionClass')
const _ = require('lodash')

const META_DATA_LENGTH = 2

function getOptions(dhcpOptionsPayload) {
    let nonParsedPayload = dhcpOptionsPayload
    let options = {}
    while(nonParsedPayload.length) {
        const {skippedPayload, dhcpOption} = parseNextOption(nonParsedPayload)
        options[dhcpOption.getMetaData().optionSchema.name] = dhcpOption.getValue()
        nonParsedPayload = nonParsedPayload.slice(skippedPayload.length, -1)
    }
    return options
}

function parseNextOption(payloadToParse) {
    
    if (payloadToParse.length < META_DATA_LENGTH) {
        console.log('Parsing offsets went wrong.', payloadToParse.length)
        return {skippedPayload: Buffer.from([]), parsedOption: {}}
    }
    
    dhcpOption = new DhcpOption()
    dhcpOption.parseToReadableFormat(payloadToParse)
    const skippedPayload = payloadToParse.slice(0, dhcpOption.getMetaData().optionLength)
    dhcpOption.parsePayload(dhcpOption.getMetaData(), payloadToParse)

    return {skippedPayload, dhcpOption}
}

module.exports = {
    getOptions
}

