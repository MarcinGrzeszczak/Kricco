
const _ = require('lodash')
module.exports = {
    parseIp,
    parseMac,
    parseTo8UInt,
    parseToListOf8UInts
}

function parseIp(buffer, offset = 0) {
    return `${buffer.readUInt8(offset)}.${buffer.readUInt8(offset+1)}.${buffer.readUInt8(offset+2)}.${buffer.readUInt8(offset+3)}`
}

function parseMac(buffer, offset = 0) {
    const numbersString = buffer.toString('hex', offset, offset+6)
    const macGroupedByArraysOfNumbersPairs = _.chunk(numbersString.split(''), 2)
    const macGroupedByStringsOfNumbersPairs = _.map(macGroupedByArraysOfNumbersPairs, arr => arr.join(''))
    const stringifiedMac = macGroupedByStringsOfNumbersPairs.join(':')
    return stringifiedMac
}

function parseTo8UInt(buffer) {
    return buffer.readUInt8()
}

function parseToListOf8UInts(buffer) {
    return new Uint8Array(buffer)
}