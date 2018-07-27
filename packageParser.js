const OPERATIONS_MAP = {
	'1' : 'DISCOVER',
	'2' : 'OFFER',
	'3' : 'REQUEST',
	'5' : 'ACK'
}

function parse(message){
	const opCode = message.readInt8(0)
	const transactionId = message.readInt8(32)
	const clientMac = message.readInt(228)
	msg = `opCode : ${opCode} \n
	transictionID : ${transactionId} \n
	clientMac : ${clientMac}
	`
	return msg
}

module.exports = parse
