const protocolParsingUtils = require('./protocolParsingUtils')
function parse(message) {
	const result = {
		siaddr: protocolParsingUtils.parseIp(message, 40),
		giaddr: protocolParsingUtils.parseIp(message, 48),
		chaddr: [
			message.readInt32BE(56),
			message.readInt32BE(88),
			message.readInt32BE(120),
			message.readInt32BE(152)
		]
	}
	console.log(result)
	return message
}

module.exports = parse