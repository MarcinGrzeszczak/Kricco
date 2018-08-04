const fs = require('fs')
const assert = require('chai').assert
const Buffer = require('buffer').Buffer
const bootpParser = require('../../bootpParser/parseBootp')

let suite = {}
describe('#parseBootp', () => {
	before(() => {
		//given
		suite.DHCP_DISCOVERY_PACKET = fs.readFileSync('mocks/dhcpDiscovery.bin')
	})
	it('should parse operation frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'op'
		const expectedFrameValue = 1
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse hardware type frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'htype'
		const expectedFrameValue = 1
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse hardware address length frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'hlen'
		const expectedFrameValue = 6
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse hops frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'hops'
		const expectedFrameValue = 0
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse transaction id frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'xid'
		const expectedFrameValue = 914510175
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse seconds elapsed frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'secs'
		const expectedFrameValue = 0
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse broadcast flags frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'flags'
		const expectedFrameValue = 0
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse client ip address frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'ciaddr'
		const expectedFrameValue = '0.0.0.0'
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse Your (client) ip address frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'yiaddr'
		const expectedFrameValue = '0.0.0.0'
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse server ip address frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'siaddr'
		const expectedFrameValue = '0.0.0.0'
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})
	
	it('should parse relay agent ip address frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'giaddr'
		const expectedFrameValue = '0.0.0.0'
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse client hardware address frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'chaddr'
		const expectedFrameValue = 'cc:9f:7a:2f:fc:6f'
		assert.strictEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})

	it('should parse magic cookie frame',() => {
	
		//when
		const parsedFrames = bootpParser(suite.DHCP_DISCOVERY_PACKET)

		//then
		const expectedFrameName = 'magicCookie'
		const expectedFrameValue = new Buffer([99, 130, 83, 99])
		assert.deepEqual(parsedFrames[expectedFrameName], expectedFrameValue)
	})
	
})
