const DhcpOption = require('./DhcpOptionClass')
const _ = require('lodash')

const META_DATA_LENGTH = 2

function getOptions(dhcpOptionsPayload) {
    //console.log(_.map(_.chunk(dhcpOptionsPayload.toString('hex'), 2), pair => pair.join('')).join(' '))
    let nonParsedPayload = dhcpOptionsPayload
    let options = {}
    while(nonParsedPayload.length) {
        const {skippedPayload, dhcpOption} = parseNextOption(nonParsedPayload)
        options[dhcpOption.getMetaData().optionSchema.name] = dhcpOption.getValue()
        nonParsedPayload = nonParsedPayload.slice(skippedPayload.length, -1)
    }
    console.log(options)
    return options
}

function parseNextOption(payloadToParse) {
    
    if (payloadToParse.length < META_DATA_LENGTH) {
        console.log('Parsing offsets went wrong.', payloadToParse.length)
        return {skippedPayload: Buffer.from([]), parsedOption: {}}
    }
   
    dhcpOption =  new DhcpOption()
    dhcpOption.parseMetaData(payloadToParse)
    dhcpOption.parsePayload(dhcpOption.getMetaData(), payloadToParse)
    const skippedPayload = payloadToParse.slice(0, dhcpOption.getMetaData().optionLength)
  
    return {skippedPayload, dhcpOption}
}

module.exports = {
    getOptions
}

