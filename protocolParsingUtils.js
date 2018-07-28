module.exports = {
    parseIp
}

function parseIp(buffer, offset) {
    return `${buffer.readInt8(offset)}.${buffer.readInt8(offset+1)}.${buffer.readInt8(offset+2)}.${buffer.readInt8(offset+3)}`
}