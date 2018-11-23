const fs = require('fs')
const assert = require('chai').assert
const dhcpOptionsParser = require('../../dhcpParser/dhcpParser')
const dhcpOptions = require('../../dhcpParser/dhcpOptions')
let suite = {}
describe('#dhcpOptions', () => {
	before(() => {
		suite = {}
		suite.DHCP_DISCOVERY_PACKET = fs.readFileSync('mocks/dhcpDiscovery.bin')
		suite.DHCP_OPTIONS_START_BYTE = 240
		suite.DHCP_BINARY_DATA = suite.DHCP_DISCOVERY_PACKET.slice(suite.DHCP_OPTIONS_START_BYTE)
	})

	it('should parse Host Name (12)', () => {
		//given
		const OPTION_NUMBER = 12
		const OPTION_NAME = dhcpOptions[OPTION_NUMBER].name

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(suite.DHCP_BINARY_DATA)

		//then
		const EXPECTED_PROPERTY_NAME = 'Text'
		const EXPECTED_PROPERTY_VALUE = 'android-d4ce383518a14fe2'
		assert.strictEqual(parsedOptions[OPTION_NAME][EXPECTED_PROPERTY_NAME], EXPECTED_PROPERTY_VALUE)
	})
	
	it('should parse DHCP Message Type (53)', () => {
		//given
		const OPTION_NUMBER = 53
		const OPTION_NAME = dhcpOptions[OPTION_NUMBER].name

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(suite.DHCP_BINARY_DATA)

		//then
		const EXPECTED_PROPERTY_NAME = 'DHCP-Message-Type'
		const EXPECTED_PROPERTY_VALUE = 1
		assert.strictEqual(parsedOptions[OPTION_NAME][EXPECTED_PROPERTY_NAME], EXPECTED_PROPERTY_VALUE)
	})

	it('should parse Parameter Request List (55)', () => {
		//given
		const OPTION_NUMBER = 55
		const OPTION_NAME = dhcpOptions[OPTION_NUMBER].name

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(suite.DHCP_BINARY_DATA)

		//then
		const EXPECTED_PROPERTY_NAME = 'Parameter-Request-List'
		const EXPECTED_PROPERTY_VALUE = [
			1,
			33,
			3,
			6,
			15,
			28,
			51,
			58,
			59,
			43
		]
		assert.sameMembers(parsedOptions[OPTION_NAME][EXPECTED_PROPERTY_NAME], EXPECTED_PROPERTY_VALUE)
	})

	it('should parse Maximum DHCP Message Size (57)', () => {
		//given
		const OPTION_NUMBER = 57
		const OPTION_NAME = dhcpOptions[OPTION_NUMBER].name

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(suite.DHCP_BINARY_DATA)

		//then
		const EXPECTED_PROPERTY_NAME = 'Maximum-DHCP-Message-Size'
		const EXPECTED_PROPERTY_VALUE = 1500
		assert.strictEqual(parsedOptions[OPTION_NAME][EXPECTED_PROPERTY_NAME], EXPECTED_PROPERTY_VALUE)
	})

	it('should parse Vendor class identifier (60)', () => {
		//given
		const OPTION_NUMBER = 60
		const OPTION_NAME = dhcpOptions[OPTION_NUMBER].name

		//when
		const parsedOptions = dhcpOptionsParser.getOptions(suite.DHCP_BINARY_DATA)

		//then
		const EXPECTED_PROPERTY_NAME = 'Vendor-class-identifier'
		const EXPECTED_PROPERTY_VALUE = 'android-dhcp-7.0'
		assert.strictEqual(parsedOptions[OPTION_NAME][EXPECTED_PROPERTY_NAME], EXPECTED_PROPERTY_VALUE)
	})

	it.only('should keep parity after deserializing serialized message', () => {
		const parsedOptions = dhcpOptionsParser.getOptions(suite.DHCP_BINARY_DATA)
		console.log(dhcpOptionsParser.serializeOptions(parsedOptions))
	})
})