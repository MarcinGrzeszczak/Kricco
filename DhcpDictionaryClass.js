const _ = require('lodash')
const INTERNAL_MAC_TO_IP_MAP = Symbol('Internal map of macs to IPs')
const IP_ADDRESSES_POLL = Symbol('Poll of availible addresses')
const ALREADY_ASSIGNED_IPS = Symbol('Poll of occupied addresses')

class DhcpDictionary {
    constructor(ipAddressesPoll/*:Set*/) {
        this[INTERNAL_MAC_TO_IP_MAP] = new Map()
        this[IP_ADDRESSES_POLL] = ipAddressesPoll
        this[ALREADY_ASSIGNED_IPS] = new Set()
    }

    assignIp(mac) {
        if (this[IP_ADDRESSES_POLL].size) return false
        if (this[INTERNAL_MAC_TO_IP_MAP].has(mac)) return false
        const ip = _.first(this[IP_ADDRESSES_POLL].values())
        this[IP_ADDRESSES_POLL].delete(ip)
        this[ALREADY_ASSIGNED_IPS].add(ip)
        this[INTERNAL_MAC_TO_IP_MAP].set(mac, ip)
    }
}

module.exports = DhcpDictionary