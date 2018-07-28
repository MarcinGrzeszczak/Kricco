const protocolParsingUtils= require('./protocolParsingUtils')
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
		ciaddr: protocolParsingUtils.parseIp(message, BOOTP_OFFSETS.CIADDR),
		yiaddr: protocolParsingUtils.parseIp(message, BOOTP_OFFSETS.YIADDR),
		siaddr: protocolParsingUtils.parseIp(message, BOOTP_OFFSETS.SIADDR),
		giaddr: protocolParsingUtils.parseIp(message, BOOTP_OFFSETS.GIADDR),
		chaddr: protocolParsingUtils.parseMac(message, BOOTP_OFFSETS.CHADDR),
		magicCookie: message.slice(BOOTP_OFFSETS.MAGIC_COOKIE, BOOTP_OFFSETS.MAGIC_COOKIE + 4)
    }
}

module.exports = parse