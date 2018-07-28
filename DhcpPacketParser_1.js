
function parse(message) {
	frameDictionary = {
		'OP' : message.readInt8(0),
		'HTYPE': message.readInt8(1),
		'HLEN': message.readInt8(2),
		'HOPS': message.readInt8(3),
		'XID' : message.readInt32BE(1),
		'SECS': message.readInt16BE(5)

	}
	return frameDictionary
}

module.exports = parse