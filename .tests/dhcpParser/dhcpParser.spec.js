const fs = require('fs')
const assert = require('chai').assert
const dhcpOptionsParser = require('../../dhcpParser/dhcpParser')

let suite = {}
describe('#dhcpOptions', () => {
	before(() => {
		suite.DHCP_DISCOVERY_PACKET = fs.readFileSync('mocks/dhcpDiscovery.bin')
	})

	it('should parse Host Name (12)', () => {
		//given
		const DHCP_OPTIONS_START_BYTE = 240
		const DHCP_OPTIONS = suite.DHCP_DISCOVERY_PACKET.slice(DHCP_OPTIONS_START_BYTE)

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(DHCP_OPTIONS)

		//then
		const expectedPropertyName = 'Host-Name'
		const expectedPropertyValue = 'android-d4ce383518a14fe2'
		assert.strictEqual(expectedPropertyValue, parsedOptions[expectedPropertyName])
	})
	
	it('should parse DHCP Message Type (53)', () => {
		//given
		const DHCP_OPTIONS_START_BYTE = 240
		const DHCP_OPTIONS = suite.DHCP_DISCOVERY_PACKET.slice(DHCP_OPTIONS_START_BYTE)

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(DHCP_OPTIONS)

		//then
		const expectedPropertyName = 'DHCP-Message-Type'
		const expectedPropertyValue = 1
		assert.strictEqual(expectedPropertyValue, parsedOptions[expectedPropertyName])
	})

	it('should parse Parameter Request List (55)', () => {
		//given
		const DHCP_OPTIONS_START_BYTE = 240
		const DHCP_OPTIONS = suite.DHCP_DISCOVERY_PACKET.slice(DHCP_OPTIONS_START_BYTE)

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(DHCP_OPTIONS)

		//then
		const expectedPropertyName = 'Parameter-Request-List'
		const expectedPropertyValue = new Uint8Array([
			1,
			33,
			3,
			6,
			15,
			28,
			51])
		assert.deepEqual(expectedPropertyValue, parsedOptions[expectedPropertyName])
	})

	it('should parse Maximum DHCP Message Size (57)', () => {
		//given
		const DHCP_OPTIONS_START_BYTE = 240
		const DHCP_OPTIONS = suite.DHCP_DISCOVERY_PACKET.slice(DHCP_OPTIONS_START_BYTE)

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(DHCP_OPTIONS)

		//then
		const expectedPropertyName = 'Maximum-DHCP-Message-Size'
		const expectedPropertyValue = 1500
		assert.strictEqual(expectedPropertyValue, parsedOptions[expectedPropertyName])
	})

	it('should parse Vendor class identifier (60)', () => {
		//given
		const DHCP_OPTIONS_START_BYTE = 240
		const DHCP_OPTIONS = suite.DHCP_DISCOVERY_PACKET.slice(DHCP_OPTIONS_START_BYTE)

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(DHCP_OPTIONS)

		//then
		const expectedPropertyName = 'Vendor-class-identifier'
		const expectedPropertyValue = 'android-dhcp-7.0'
		assert.strictEqual(expectedPropertyValue, parsedOptions[expectedPropertyName])
	})
})