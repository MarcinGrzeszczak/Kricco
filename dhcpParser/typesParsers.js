const TypeParser = require('./TypeParserClass')
const _ = require('lodash')

const dictionary = {
    uInt8: {
        serialize: number => Buffer.alloc(8).writeUInt8(number),
        deserialize: buffer => buffer.readUInt8(),
        size: 8
    }
}


//We convert data to instances of TypeParser before exporting
const dictionaryOfTypeParsers = _.mapValues(dictionary, entry => new TypeParser(entry))

module.exports = dictionaryOfTypeParsers