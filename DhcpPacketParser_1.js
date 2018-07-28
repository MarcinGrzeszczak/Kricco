const protocolParsingUtils = require('./protocolParsingUtils')

function parse(message) {
	frameDictionary = {
		'OP' : message.readInt8(0),
		'HTYPE': message.readInt8(1),
		'HLEN': message.readUInt8(2),
		'HOPS': message.readUInt8(3),
		'XID' : message.readUInt32BE(4),
		'SECS': message.readUInt16BE(8),
		'FLAGS': message.readUInt16BE(10),
		'CIADDR': protocolParsingUtils.parseIp(message,12),
		'YIADDR': protocolParsingUtils.parseIp(message,16)

	}
	return frameDictionary
}

module.exports = parse