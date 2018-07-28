const protocolParsingUtils = require('./protocolParsingUtils')
function parse(message) {
	const result = {
		siaddr: protocolParsingUtils.parseIp(message, 20),
		giaddr: protocolParsingUtils.parseIp(message, 24),
		chaddr: protocolParsingUtils.parseMac(message, 28)
	}
	console.log(result)
	return message
}

module.exports = parse