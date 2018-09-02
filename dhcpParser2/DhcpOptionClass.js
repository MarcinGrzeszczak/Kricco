class DhcpOption {
    constructor({name, properties}) {
        this.name = name
        this.properties = properties
    }

    static getBufferSlice(buffer) {
        const SIZE_OFFSET = 1
        const size = buffer.readUInt8(SIZE_OFFSET)
        return buffer.slice(0, size)
    }

    static getOptionNumber(buffer) {
        return buffer.readUInt8()
    }

    parse(bufferSlice) {
        const PAYLOAD_OFFSET = 2
        const payload = bufferSlice.slice(PAYLOAD_OFFSET)[0]
        const parsedProperties = this.properties.reduce((parsedPropertiesObject, property) => {
            if (property.isList) {
                //TO DO handling list properties
            }
            const bufferSlice = property.getBufferSlice(payload)
            return parsedPropertiesObject[property.name] = property.deserialize(bufferSlice)
        }, {})
        return parsedProperties
    }
}

module.exports = DhcpOption