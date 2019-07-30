module.exports = {
    flags: {
        port: {
            type: 'number',
            default: 67,
            alias: 'p'
        },
        fileToParse: {
            type: 'string',
            alias: 'f'
        },
        fileToSerialize: {
            type: 'string',
            alias: 's'
        },
        debug: {
            type: 'boolean',
            alias: 'd'
        }
    }
}