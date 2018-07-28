
function parserIP(uIntNumber) {
	return uIntNumber
}

function parse(message) {
	frameDictionary = {
		'OP' : message.readInt8(0),
		'HTYPE': message.readInt8(1),
		'HLEN': message.readUInt8(2),
		'HOPS': message.readUInt8(3),
		'XID' : message.readUInt32BE(4),
		'SECS': message.readUInt16BE(8),
		'FLAGS': message.readUInt16BE(10),
		'CIADDR': parserIP(message.readUInt32BE(12)),
		'YIADDR': parserIP(message.readUInt32BE(16))

	}
	return frameDictionary
}

module.exports = parse