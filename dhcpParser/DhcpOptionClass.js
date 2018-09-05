const sharedSymbols = require('./sharedSymbols')
class DhcpOption {
    constructor({name, properties}) {
        this.name = name
        this.properties = properties
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

    parse(bufferSlice) {
        const PAYLOAD_OFFSET = 2
        const payload = bufferSlice.slice(PAYLOAD_OFFSET)
        const parsedProperties = this.properties.reduce(DhcpOption.accumulateProperties(payload), {})
        return parsedProperties
    }

    static accumulateProperties(payload) {
        let offset = 0
        return (parsedPropertiesObject, property) => {
            const bufferSlice = property.getBufferSlice(payload)
            const propertyName = property.getName()
            parsedPropertiesObject[propertyName] = property.deserialize(bufferSlice)
            offset += bufferSlice.length
            payload = bufferSlice.slice(offset)
            return parsedPropertiesObject
        }
    }
}

module.exports = DhcpOption