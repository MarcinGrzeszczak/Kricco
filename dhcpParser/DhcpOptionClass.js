const DhcpProperty = require('./DhcpPropertyClass')
class DhcpOption {
    constructor(name, properties) {
        this.properties = properties
        this.name = name
    }

    parsePayload(metaData, dhcpOptionsPayload) {
        let payloadData = {}
        let nonParsedPayload = dhcpOptionsPayload.slice(2, metaData.payloadLength)
        this.properties.forEach(propertySchema => {
            payloadData[propertySchema.name] = propertySchema.parse(nonParsedPayload)
            //Property with unknown length should always be last item in the array
            if (propertySchema.isLengthKnown())
                nonParsedPayload = nonParsedPayload.slice(0, propertySchema.payloadLength)
        })
        return payloadData
    }

    static parseMetaData(nonParsedDhcpOptions) {
        const META_DATA_LENGTH = 2
        const code = nonParsedDhcpOptions.slice(0,1).readUInt8()
        const optionLength = nonParsedDhcpOptions.slice(1,2).readUInt8()
        const payloadLength = optionLength - META_DATA_LENGTH
        return {code, payloadLength}
    }
}

module.exports = DhcpOption