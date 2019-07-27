const parsingUtils = require('./parsingUtils')
const BOOTP_OFFSETS = require('./bootpOffsets')
function parse(message) {
    return  {
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
}

module.exports = parse