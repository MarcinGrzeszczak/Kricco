class DhcpOptionProperty {
    constructor(name, parser) {
        this.name = name
        this.parser = parser
    }

    parse(payload) {
        return this.parser(payload)
    }

    static getPayloadLength(payload) {
        return payload.slice(1, 2).readUInt8()
    }
}