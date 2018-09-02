const TYPE_PARSER = Symbol('Type parser')
const IS_LIST = Symbol('Is list')
const NAME = Symbol('Name')
const IS_BUFFER_SIZE_VALID = Symbol('Is buffer size valid')

class DhcpProperty {
    constructor({typeParser, isList, name}) {
        this[TYPE_PARSER] = typeParser
        this[IS_LIST] = isList
        this[NAME] = name
    }

    [IS_BUFFER_SIZE_VALID](bufferChunk) {
        if (!this[IS_LIST]) return bufferChunk.length === this.getChunkBytesize()
        return Number.isInteger(bufferChunk.length / this.getChunkBytesize())
    }

    getName() {
        return this[NAME]
    }

    getChunkBytesize() {
        return this[TYPE_PARSER].getSize()
    }

    serialize(listOfValues) {
        if (!this[IS_LIST] && listOfValues.length > 1) {
            const error = `${this.getName()} Property serialize error: list of values of length ${listOfValues.length}, has been passed to serialize, but the data type is not a list type)`
            throw new Error(error)
        }
        const finalBufferSize = listOfValues.length * this.getChunkBytesize()
        const listOfBuffers = listOfValues.map(this[TYPE_PARSER].serialize)
        return Buffer.concat(listOfBuffers, finalBufferSize)
    }

    //Not whole DHCP Options buffer, only part belonging to this DHCP property
    deserialize(bufferChunk) {
        if (this[IS_BUFFER_SIZE_VALID](bufferChunk)) {
            const error = `${this.getName()} Property deserialize error: Buffer size ${bufferChunk.length}, doesn't match property allowed chunk bytesize (${this.getChunkBytesize()})`
            throw new Error(error)
        }
        const parserIterations = bufferChunk.length / this.getChunkBytesize()

        const emptyList = new Array(parserIterations).fill(0)
        const parsedValuesList = emptyList.map((emptyValue, iteration) => {
            const offset = iteration * this.getChunkBytesize()
            const singleUnitOfData = bufferChunk.slice(offset, offset + this.getChunkBytesize())
            return this[TYPE_PARSER].deserialize(singleUnitOfData)
        })

        return parsedValuesList
    }
}

module.exports = DhcpProperty