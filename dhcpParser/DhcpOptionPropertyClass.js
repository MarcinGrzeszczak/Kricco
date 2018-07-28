class DhcpOptionProperty {
    constructor(name, parser) {
        this.name = name
        this.parser = parser
    }

    parse(payload) {
        return this.parser(payload)
    }
}