const os = require('os')
const _ = require('lodash')
const networkInterfaces = os.networkInterfaces()


const IPV4 = 'IPv4'


function getIp(interfaceName) {
    const selectedInterface = networkInterfaces[interfaceName]
    const relevelantAddresses = _.filter(selectedInterface, isRelevelant)
    return relevelantAddresses
}

function getInterfaces() {
    return Object.keys(networkInterfaces)
}

function isRelevelant(interface) {
    return !isLocal(interface) && isIpV4(interface)
}

function isLocal(interface) {
    return interface.internal
}

function isIpV4(interface) {
    return interface.family === IPV4
}

module.exports = {
    getIp,
    getInterfaces
}


