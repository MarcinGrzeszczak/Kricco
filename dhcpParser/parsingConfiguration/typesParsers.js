/*
    Types parsers control how certain types of data have to be parsed.
*/

const _ = require('lodash')

const TypeParser = require('./configurationClasses/TypeParserClass')

const dictionary = {
    uInt8: {
        serialize: number => {
			const buffer = Buffer.alloc(1)
			buffer.writeUInt8(number)
			return buffer
		},
        deserialize: buffer => buffer.readUInt8(),
        size: 1 
    },
    uInt16: {
        serialize: number => {
			const buffer = Buffer.alloc(2)
			buffer.writeUInt16BE(number)
			return buffer
		},
        deserialize: buffer => buffer.readUInt16BE(),
        size: 2
	},
	uInt32: {
		serialize: number => {
			const buffer = Buffer.alloc(4)
			buffer.writeUInt32BE(number)
			return buffer
		},
		deserialize: buffer => buffer.readUInt32BE(),
		size: 4
    },
    
    hex: {
       serialize: string => Buffer.from(string, 'hex')[0],
       deserialize: buffer => buffer.toString('hex'),
       size: 1
    },

    utf8: {
        serialize: string => {
			const buffer = Buffer.alloc(1)
			buffer.write(string)
			return buffer
		},
        deserialize: buffer => buffer.toString('utf8'),
        size: 1
    },
    ipv4: {
        serialize: ip => {
			const parsedOctets = string.split('.').map(parseInt)
			const buffer = Buffer.alloc(4)
            return buffer.writeUInt8(parsedOctets)
        },
        deserialize: buffer => {
            let arrayToFill = Array(4).fill()
            const listOfOctets = arrayToFill.map((value, index) => buffer.readUInt8(index))
            return listOfOctets.join('.')
        },
        size: 4
    },
    end: {
        serialize: () => Buffer.alloc(0),
        deserialize: () => null,
        size: 0
    }
}


//We convert data to instances of TypeParser before exporting
const dictionaryOfTypeParsers = _.mapValues(dictionary, entry => new TypeParser(entry))

module.exports = dictionaryOfTypeParsers