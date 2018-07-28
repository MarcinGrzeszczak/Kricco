const protocolParsingUtils = require('./protocolParsingUtils')
function parse(message) {
	const 
	const result = {
		siaddr: protocolParsingUtils.parseIp(message, 20),
		giaddr: protocolParsingUtils.parseIp(message, 24),
		chaddr: [
			message.readInt32BE(28),
			message.readInt32BE(32),
			message.readInt32BE(36),
			message.readInt32BE(40)
		]
	}
	console.log(result)
	return message
}

module.exports = parse