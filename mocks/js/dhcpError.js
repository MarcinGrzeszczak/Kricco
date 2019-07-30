
const DHCPDECLINE = require('../../parser/dhcpParser/parsingConfiguration/typesEnumValues')[4]

module.exports = {
  bootp: {
      op: 1,
      htype: 1,
      hlen: 6,
      hops: 0,
      xid: 4035787473,
      secs: 0,
      flags: 0,
      ciaddr: '0.0.0.0',
      yiaddr: '0.0.0.0',
      siaddr: '0.0.0.0',
      giaddr: '0.0.0.0',
      chaddr: 'd4:c9:4b:5a:8d:ca',
      magicCookie: Buffer.from([63, 82, 53, 63]) },
  dhcp: { 
      'DHCP Message Type': { 'DHCP-Message-Type': DHCPDECLINE },
      'Client-identifier': { 'Client-Identifier': '01d4c94b5a8dca' },
      'Maximum DHCP Message Size': { 'Maximum-DHCP-Message-Size': 1500 },
      'Vendor class identifier': { 'Vendor-class-identifier': 'android-dhcp-8.0.0' },
      'Parameter request list': { 'Parameter-Request-List': [ 1, 3, 6, 15, 26, 28, 51, 58, 59, 43 ] },
      END: {} 
  } 
}