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
        let offset = 0
        const parsedProperties = this.properties.reduce((parsedPropertiesObject, property) => {
            property.getName()
            const bufferSlice = property.getBufferSlice(payload)
            offset += property.getChunkBytesize()
            parsedPropertiesObject[property.getName()] = property.deserialize(bufferSlice)
            return parsedPropertiesObject
        }, {})
        return parsedProperties
    }
}

module.exports = DhcpOption