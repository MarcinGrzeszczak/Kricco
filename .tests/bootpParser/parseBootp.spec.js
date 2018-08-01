const fs = require('fs')
const assert = require('chai').assert
const Buffer = require('buffer').Buffer
const bootpParser = require('../../bootpParser/parseBootp')

let suite = {}
describe('#parseBootp', () => {
	before(() => {
		suite.DHCP_DISCOVERY_PACKET = fs.readFileSync('mocks/dhcpDiscovery.bin')
	})
	it('should parse bootp frames',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedParserOutput = {
			op: 1,
			htype: 1,
			hlen: 6,
			hops: 0,
			xid: 914510175,
			secs: 0,
			flags: 0,
			ciaddr: '0.0.0.0',
			yiaddr: '0.0.0.0',
			siaddr: '0.0.0.0',
			giaddr: '0.0.0.0',
			chaddr: 'cc:9f:7a:2f:fc:6f',
			magicCookie: new Buffer([99, 130, 83, 99])
		}
		//console.log(parsedFrames)
		//console.log(expectedParserOutput)
		assert.deepInclude(parsedFrames, expectedParserOutput)

	})
})
