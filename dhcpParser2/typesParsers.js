const TypeParser = require('./TypeParserClass')
const _ = require('lodash')

const dictionary = {
    uInt8: {
        serialize: number => Buffer.alloc(8).writeUInt8(number),
        deserialize: buffer => buffer.readUInt8(),
        size: 8
    },
    string: {
        serialize: string => Buffer.alloc(1).write(string),
        deserialize: buffer => buffer.toString('utf8'),
        size: 1
    },
    ipv4: {
        serialize: ip => {
            const parsedOctets = string.split('.').map(parseInt)
            return Buffer.alloc(32).writeUInt8(parsedOctets)
        },
        deserialize: buffer => {
            let arrayToFill = [].fill(0, 0, 4)
            const listOfOctets = arrayToFill.map((value, index) => Buffer.readUInt8(index))
            return listOfOctets.join('.')
        },
        size: 32
    }
}


//We convert data to instances of TypeParser before exporting
const dictionaryOfTypeParsers = _.mapValues(dictionary, entry => new TypeParser(entry))

module.exports = dictionaryOfTypeParsers