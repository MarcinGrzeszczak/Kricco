const SIZE = Symbol('Size')
const NAME = Symbol('Name')

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