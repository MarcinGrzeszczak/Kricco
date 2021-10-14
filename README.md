# Kricco
This is a DHCP server which assigns IP addresses to devices that tries to access a local network. It listenes on the port 67 and when new device asks for an IP, the app assigns it to the requesting device over DHCP protocol.

# How to run

## Starting a server
Run below command to start server:
`npm start`, or `npm start -- -p <PORT>`
Double dash is necessary to pass flags from npm to Kricco.
The default port is 67, you may need to give administrator/root privilleges to the app to access this port.

## Parsing a dumped DHCP packet
Run `npm start -- --fileToParse="path/to/file"` or `npm start -- -f="path/to/file"` in order to parse a dumped DHCP packet. There are few dumped dhcp packets in Kricco repo already. You can find them in `mocks/`.

## Detailed logs
Run `npm start -- --debug` to see debug logs

## Testing
Simply run `npm test`

# Technologies
 - meow
 - lodash
 - chai & mocha

 # Roadmap
 - [X] Parse BOOTP Packets
 - [ ] Parse DHCP Packets (WIP)
 - [ ] Send DHCP Pakcets
 - [ ] IP Addresses map
 - [ ] IP Addresses management
