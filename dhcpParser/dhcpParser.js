const DhcpOption = require('./DhcpOptionClass')
const dhcpOptions = require('./dhcpOptions')

function* getOptions(dhcpOptionsPayload) {
    let isPayloadStillParsing = true
    let nonParsedPayload = dhcpOptionsPayload
    while(isPayloadStillParsing) {
        const optionMetaData = DhcpOption.parseMetaData(isPayloadStillParsing)
        dhcpOptions[optionMetaData.code].parsePayload(optionMetaData, nonParsedPayload)
    }
    
}