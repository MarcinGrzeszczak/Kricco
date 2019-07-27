
const _ = require('lodash')
module.exports = {
    parseIp,
    parseToString,
    parseMac,
    parseTo8UInt,
    parseTo16UInt,
    parseToListOf8UInts,
    serializeIp,
    serializeMac
}

function parseIp(buffer, offset = 0) {
    return `${buffer.readUInt8(offset)}.${buffer.readUInt8(offset+1)}.${buffer.readUInt8(offset+2)}.${buffer.readUInt8(offset+3)}`
}

function serializeIp(ip) {
    const octetsList = ip.split('.').map(octet => parseInt(octet))
    const buffer = Buffer.alloc(4)
    octetsList.forEach((octet, index) => {
        buffer.writeUInt8(octet, index)
    })
    return buffer
}

function serializeMac(mac) {
    const octetsList = mac.split(':').map(octet => parseInt(octet, 16))
    const buffer = Buffer.alloc(6)
    octetsList.forEach((octet, index) => {
        buffer.writeUInt8(octet, index)
    })
    return buffer
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

function parseTo16UInt(buffer) {
    return buffer.readUInt16BE()
}


function parseToString(buffer) {
    const parsedText = buffer.toString()
    const strippedText = parsedText.replace('\f','')
    return strippedText
}

function parseToListOf8UInts(buffer) {
    return new Uint8Array(buffer)
}