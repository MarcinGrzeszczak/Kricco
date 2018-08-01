const DhcpOption = require('./DhcpOptionClass')
const dhcpOptions = require('./dhcpOptions')
const _ = require('lodash')

const META_DATA_LENGTH = 2

function getOptions(dhcpOptionsPayload) {
    //console.log(_.map(_.chunk(dhcpOptionsPayload.toString('hex'), 2), pair => pair.join('')).join(' '))
    let nonParsedPayload = dhcpOptionsPayload
    let options = {}
    while(nonParsedPayload.length) {
        const {skippedPayload, parsedOption} = parseNextOption(nonParsedPayload)
        options[parsedOption.name] = parsedOption.value
        nonParsedPayload = nonParsedPayload.slice(skippedPayload.length, -1)
    }
    return options
}

function parseNextOption(payloadToParse) {
    if (payloadToParse.length < META_DATA_LENGTH) {
        console.log('Parsing offsets went wrong.', payloadToParse.length)
        return {skippedPayload: Buffer.from([]), parsedOption: {}}
    }
    const optionMetaData = DhcpOption.parseMetaData(payloadToParse)
    const skippedPayload = payloadToParse.slice(0, optionMetaData.payloadLength) //+ META_DATA_LENGTH)
    if (!dhcpOptions[optionMetaData.code]) {
        console.log('Missing parameter ', optionMetaData.code)
        return {skippedPayload, parsedOption: {}}
    }
   
    const parsedOption = dhcpOptions[optionMetaData.code].parsePayload(optionMetaData, payloadToParse)
    return {skippedPayload, parsedOption}
}

module.exports = {
    getOptions
}

