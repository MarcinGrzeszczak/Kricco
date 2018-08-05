const DHCP_OPTIONS = require('./dhcpOptions')
const _ = require('lodash')
class DhcpOption {
    
    constructor() {
        this.parsedPayload = null
        this.metaData = null
        this.hexOption = null
    }

    getHex() {
        return this.hexOption
    }

    getValue() {
        if (this.metaData.optionSchema.name in this.parsedPayload)
            return this.parsedPayload[this.metaData.optionSchema.name]

        return this.parsedPayload
    }

    getAllProperties() {
        return this.parsedPayload
    }

    getMetaData() {
        return this.metaData
    }

    findOptionByCode(optionCode) {
        const filteredOption = _.filter(DHCP_OPTIONS, {code: optionCode})
       
        if (filteredOption.length === 0)
           throw(`Missing Option ${optionCode}`)
      
        return filteredOption[0]
    }

    writeToHex(optionName, payload) {}

    parseToReadableFormat(nonParsedOption) {
        this.hexOption = nonParsedOption
        this.parseMetaData(this.hexOption)
        this.parsePayload(this.metaData, this.hexOption)
    }

    parsePayload(metaData, dhcpOptionsPayload) {
        let payloadData = {}
        const propertiesArray = metaData.optionSchema.properties
        let nonParsedPayload = dhcpOptionsPayload.slice(2, metaData.optionLength)
        propertiesArray.forEach(propertySchema => {
            //Property with unknown length should always be last item in the array
            if (propertySchema.isLengthKnown())
                nonParsedPayload = nonParsedPayload.slice(0, propertySchema.payloadLength)

            payloadData[propertySchema.name] = propertySchema.parse(nonParsedPayload)
        })
        this.parsedPayload = payloadData
    }

    parseMetaData(nonParsedDhcpOptions) {
        const META_DATA_LENGTH = 2
        const optionCode = nonParsedDhcpOptions.slice(0,1).readUInt8()
        const optionSchema = this.findOptionByCode(optionCode)
        const payloadLength = nonParsedDhcpOptions.slice(1,2).readUInt8()
        const optionLength = payloadLength + META_DATA_LENGTH
        this.metaData = {optionCode, optionSchema, optionLength}
    }
}

module.exports = DhcpOption