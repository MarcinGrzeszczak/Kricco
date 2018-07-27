const OPERATIONS_MAP = {
	'1' : 'DISCOVER',
	'2' : 'OFFER',
	'3' : 'REQUEST',
	'5' : 'ACK'
}

function parse(message){
	return message.toString('hex')
}

module.exports = parse
