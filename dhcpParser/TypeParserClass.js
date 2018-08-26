const SIZE = Symbol('Size')

class TypeParser {
    constructor({serialize, deserialize, size}) {
        this.serialize = serialize
        this.deserialize = deserialize
        this[SIZE] = size
    }

    getSize() {
        return this[SIZE]
    }
}

module.exports = TypeParser