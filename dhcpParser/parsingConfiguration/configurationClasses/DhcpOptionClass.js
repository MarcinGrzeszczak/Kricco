const _ = require('lodash')
class DhcpOption {
    constructor({name, properties}, id) {
        this.name = name
		this.properties = properties
		this.id = id
    }

    static parseOptionSize(buffer) {
        const SIZE_OFFSET = 1
        return buffer.readUInt8(SIZE_OFFSET)
    }

    static getBufferSlice(buffer) {
       const size = DhcpOption.parseOptionSize(buffer)
       const PAYLOAD_OFFSET = 2
       return buffer.slice(0, PAYLOAD_OFFSET + size)
    }

    static parseOptionNumber(buffer) {
        return buffer.readUInt8()
    }

    parse(dhcpOptionRelatedBufferSlice) {
        const PAYLOAD_OFFSET = 2
        const payload = dhcpOptionRelatedBufferSlice.slice(PAYLOAD_OFFSET)
        const parsedProperties = this.properties.reduce(DhcpOption.accumulateProperties(payload), {})
        return parsedProperties
	}
	
	serialize(optionObject) {
		let listOfBuffers = []
		_.forEach(optionObject, (propertyValue, propertyName) => {
			const relatedProperty = this.properties.find(iteratedProperty => iteratedProperty.getName() === propertyName)
			listOfBuffers.push(relatedProperty.serialize(propertyValue))
		})
		const optionId = Buffer.alloc(1)
		optionId.writeUInt8(this.id)
		const propertiesBuffer = Buffer.concat(listOfBuffers)
		const length = Buffer.alloc(1)
		length.writeUInt8(propertiesBuffer.length)
		return Buffer.concat([optionId, length, propertiesBuffer])
	}

    static accumulateProperties(payload) {
        let offset = 0
        return (parsedPropertiesObject, property) => {
            const bufferSlice = property.getBufferSlice(payload)
            const propertyName = property.getName()
            const parsingResult = {[propertyName]: property.deserialize(bufferSlice)}
            offset += bufferSlice.length
            payload = bufferSlice.slice(offset)
            return Object.assign({}, parsedPropertiesObject, parsingResult)
        }
    }
}

module.exports = DhcpOption