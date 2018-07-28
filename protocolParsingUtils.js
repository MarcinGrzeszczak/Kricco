
const _ = require('lodash')
module.exports = {
    parseIp,
    parseMac
}

function parseIp(buffer, offset) {
    return `${buffer.readUInt8(offset)}.${buffer.readUInt8(offset+1)}.${buffer.readUInt8(offset+2)}.${buffer.readUInt8(offset+3)}`
}

function parseMac(buffer, offset) {
    const numbersString = buffer.toString('hex', offset, offset+6)
    console.log(numbersString)
    return _.chunk(numbersString.split(''), 2).join(':')
}