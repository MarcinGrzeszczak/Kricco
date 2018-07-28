module.exports = {
    parseIp
}

function parseIp(buffer, offset) {
    return `${buffer.readUInt8(offset)}.${buffer.readUInt8(offset+1)}.${buffer.readUInt8(offset+2)}.${buffer.readUInt8(offset+3)}`
}

function parseMac(buffer, offset) {
    return `${buffer.readInt8(offset)}.${buffer.readInt8(offset+1)}.${buffer.readInt8(offset+2)}.${buffer.readInt8(offset+3)}`
}