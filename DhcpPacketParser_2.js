const protocolParsingUtils = require('./protocolParsingUtils')
function parse(message) {
	console.log(protocolParsingUtils.parseIp(message, 40))
	console.log(protocolParsingUtils.parseIp(message, 48))
	return message
}

module.exports = parse