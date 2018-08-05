const DHCP_OPTIONS = require('./dhcpOptions')
const _ = require('lodash')
const MISSING_OPTION = Symbol('Missing option')
class DhcpOption {
    
    constructor() {
        this.parsedPayload = null
        this.metaData = null
    }

    getValue() {
        if (this.metaData.optionSchema.name in this.parsedPayload)
            return this.parsedPayload[this.metaData.optionSchema.name]

        return this.parsedPayload
    }

    isMissingOption(){
        return this.metaData.optionSchema === MISSING_OPTION
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
            return MISSING_OPTION
        return filteredOption[0]
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
        this.metaData = {optionSchema, optionLength}
    }
}

module.exports = DhcpOption