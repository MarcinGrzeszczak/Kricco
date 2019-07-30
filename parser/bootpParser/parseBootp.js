const parsingUtils = require('./parsingUtils')
const BOOTP_OFFSETS = require('./bootpOffsets')
const {logger} = require('../../logger')
function parse(message) {
	logger.debug('Starting BOOTP part parsing')
	const bootp = {
		op : message.readInt8(BOOTP_OFFSETS.OP),
		htype: message.readInt8(BOOTP_OFFSETS.HTYPE),
		hlen: message.readUInt8(BOOTP_OFFSETS.HLEN),
		hops: message.readUInt8(BOOTP_OFFSETS.HOPS),
		xid : message.readUInt32BE(BOOTP_OFFSETS.XID),
		secs: message.readUInt16BE(BOOTP_OFFSETS.SECS),
		flags: message.readUInt16BE(BOOTP_OFFSETS.FLAGS),
		ciaddr: parsingUtils.parseIp(message, BOOTP_OFFSETS.CIADDR),
		yiaddr: parsingUtils.parseIp(message, BOOTP_OFFSETS.YIADDR),
		siaddr: parsingUtils.parseIp(message, BOOTP_OFFSETS.SIADDR),
		giaddr: parsingUtils.parseIp(message, BOOTP_OFFSETS.GIADDR),
		chaddr: parsingUtils.parseMac(message, BOOTP_OFFSETS.CHADDR),
		magicCookie: message.slice(BOOTP_OFFSETS.MAGIC_COOKIE, BOOTP_OFFSETS.MAGIC_COOKIE + 4)
	}
	logger.debug(`Parsig BOOTP done, result: `)
	logger.debug(bootp)
	return bootp
}

function serialize(bootpObject) {
	logger.debug(`Serializing BOOTP:`)
	logger.debug(bootpObject)
	const buffer = Buffer.alloc(240)
	buffer.writeUInt8(bootpObject.op, BOOTP_OFFSETS.OP)
	buffer.writeUInt8(bootpObject.htype, BOOTP_OFFSETS.HTYPE)
	buffer.writeUInt8(bootpObject.hlen, BOOTP_OFFSETS.HLEN)
	buffer.writeUInt8(bootpObject.hops, BOOTP_OFFSETS.HOPS)
	buffer.writeUInt32BE(bootpObject.xid, BOOTP_OFFSETS.XID)
	buffer.writeUInt16BE(bootpObject.secs, BOOTP_OFFSETS.SECS)
	buffer.writeUInt16BE(bootpObject.flags, BOOTP_OFFSETS.FLAGS)

	parsingUtils.serializeIp((bootpObject.ciaddr)).copy(buffer, BOOTP_OFFSETS.CIADDR)
	parsingUtils.serializeIp((bootpObject.yiaddr)).copy(buffer, BOOTP_OFFSETS.YIADDR)
	parsingUtils.serializeIp((bootpObject.siaddr)).copy(buffer, BOOTP_OFFSETS.SIADDR)
	parsingUtils.serializeIp((bootpObject.giaddr)).copy(buffer, BOOTP_OFFSETS.GIADDR)
	parsingUtils.serializeMac((bootpObject.chaddr)).copy(buffer, BOOTP_OFFSETS.CHADDR)
	bootpObject.magicCookie.copy(buffer, BOOTP_OFFSETS.MAGIC_COOKIE)
	logger.debug(`BOOTP serializing done. Result:`)
	logger.debug(buffer)
	return buffer
}

module.exports = {parse, serialize}