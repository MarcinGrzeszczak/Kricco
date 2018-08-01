const UNKNOWN_PROPERTY_LENGTH = Symbol('Unknown proeprty length')

class DhcpProperty {
    constructor(name, payloadLength, parser) {
        this.name = name
        this.payloadLength = payloadLength
        this.parser = parser
    }

    parse(payload) {
        return this.parser(payload)
    }

    isLengthKnown() {
        return this.payloadLength !== UNKNOWN_PROPERTY_LENGTH
    }

    static getUnknownPropertyLengthSymbol() {
        return UNKNOWN_PROPERTY_LENGTH
    }
}

module.exports = DhcpProperty