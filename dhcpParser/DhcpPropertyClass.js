const FORMATTERS = require('./formatters')
const sharedSymbols = require('./sharedSymbols')

const TYPE_PARSER = Symbol('Type parser')
const IS_LIST = Symbol('Is list')
const NAME = Symbol('Name')
const IS_BUFFER_SIZE_VALID = Symbol('Is buffer size valid')
const FORMATTER = Symbol('Formatter')
const GET_SINGLE_DATA_UNIT_SIZE = Symbol('Get single data unit size')

class DhcpProperty {
    constructor({typeParser, isList, name, formatter = FORMATTERS.EXTRACT_FIRST_ELEMENT}) {
        this[TYPE_PARSER] = typeParser
        this[IS_LIST] = isList
        this[NAME] = name
        this[FORMATTER] = formatter
    }

    [IS_BUFFER_SIZE_VALID](bufferChunk) {
        if (!this[IS_LIST]) return bufferChunk.length === this.getChunkBytesize()
        return Number.isInteger(bufferChunk.length / this[GET_SINGLE_DATA_UNIT_SIZE]())
    }

    [GET_SINGLE_DATA_UNIT_SIZE]() {
        return this[TYPE_PARSER].getSize()
    }

    getName() {
        return this[NAME]
    }

    getChunkBytesize() {
        if (this[IS_LIST]) sharedSymbols.UNKNOWN_LENGTH
        return this[GET_SINGLE_DATA_UNIT_SIZE]()
    }

    getBufferSlice(buffer) {
        if (this[IS_LIST]) return buffer
        return buffer.slice(0, this[GET_SINGLE_DATA_UNIT_SIZE]())
    }

    serialize(listOfValues) {
        if (!this[IS_LIST] && listOfValues.length > 1) {
            const error = `${this.getName()} Property serialize error: list of values of length ${listOfValues.length}, has been passed to serialize, but the data type is not a list type)`
            throw new Error(error)
		}
		if (!this[IS_LIST]) listOfValues = [listOfValues]
        const finalBufferSize = listOfValues.length * this[GET_SINGLE_DATA_UNIT_SIZE]()
        const listOfBuffers = listOfValues.map(this[TYPE_PARSER].serialize)
        return Buffer.concat(listOfBuffers, finalBufferSize)
    }

    deserialize(dhcpPropertyRelatedBufferSlice) {
        if (!this[IS_BUFFER_SIZE_VALID](dhcpPropertyRelatedBufferSlice))
            this.throwDeserializationError(dhcpPropertyRelatedBufferSlice)

        const parserIterations = dhcpPropertyRelatedBufferSlice.length / this[GET_SINGLE_DATA_UNIT_SIZE]()
        const emptyList = new Array(parserIterations).fill(0)
        const parsedValuesList = emptyList.map((emptyValue, iteration) => {
            const offset = iteration * this[GET_SINGLE_DATA_UNIT_SIZE]()
            const singleUnitOfData = dhcpPropertyRelatedBufferSlice.slice(offset, offset + this[GET_SINGLE_DATA_UNIT_SIZE]())
            return this[TYPE_PARSER].deserialize(singleUnitOfData)
        })
        const formattedValue = this[FORMATTER](parsedValuesList)
        return formattedValue
    }

    throwDeserializationError(bufferChunk) {
        const error = `${this.getName()} Property deserialize error: Buffer size ${bufferChunk.length}, doesn't match property allowed chunk bytesize (${this.getChunkBytesize()})`
        throw new Error(error)
    }
}

module.exports = DhcpProperty