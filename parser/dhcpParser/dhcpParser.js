const _ = require('lodash')

const dhcpOptions = require('./parsingConfiguration/dhcpOptions')
const DhcpOption = require('./parsingConfiguration/configurationClasses/DhcpOptionClass')
const dhcpResolver = require('./dhcpResolver')

const {logger} = require('../../logger')

const END_OPTION_NUMBER = 255
const METADATA_PAYLOAD_SIZE = 2

function serializeOptions(options) {
    logger.debug(`Beginning of DHCP serialization for options:`)
    logger.debug(options)
	let buffersList = []
	_.forEach(options, (option, optionName) => {
        logger.debug(`Serializing DHCP option "${optionName}"`)
		const referredOption = _.find(dhcpOptions, iteratedDhcpOption => iteratedDhcpOption.name === optionName)
		buffersList.push(referredOption.serialize(option))
    })
    logger.debug(`Serializing DHCP option "${optionName}"`)
	return Buffer.concat(buffersList)
}

function getOptions(buffer) {
    logger.debug(`Starting of packet parsing. Packet data of DHCP part: ${buffer.toString('hex')}`)
    const result = getNextOption(buffer)
    return result
}

function getNextOption(buffer, offset = 0, accumulatedOptions = {}) {
    const optionNumber = DhcpOption.parseOptionNumber(buffer.slice(offset))
    if (!dhcpOptions[optionNumber]) {
        logger.debug(`DHCP option at offset ${offset}, ID: ${optionNumber}, the option is unknown to Kricco.`)
        return handleUnknownDhcpProperty(buffer, offset, accumulatedOptions, optionNumber)
    }
    const optionName = dhcpOptions[optionNumber].name
    logger.debug(`DHCP option at offset ${offset}, recognized as ${optionNumber} (${optionName}).`)
    if (optionNumber === END_OPTION_NUMBER)
        return Object.assign({}, accumulatedOptions, {[optionName]: {}})

    const relatedBufferSlice = DhcpOption.getBufferSlice(buffer.slice(offset))
    logger.debug(`Parsing "${optionName}" data: ${relatedBufferSlice.toString('hex')}`)
    const retrievedProperties = dhcpOptions[optionNumber].parse(relatedBufferSlice)
    const newAccumulatedOptions = Object.assign({}, accumulatedOptions, {[optionName]: retrievedProperties})
    const newOffset = offset + METADATA_PAYLOAD_SIZE + DhcpOption.parseOptionSize(relatedBufferSlice)
    return getNextOption(
        buffer,
        newOffset,
        newAccumulatedOptions
    )
}

function handleUnknownDhcpProperty(buffer, offset, accumulatedOptions = {}, optionNumber) {
    dhcpResolver(optionNumber)
        .then(optionName => {
            logger.error(`Unknown DHCP option ID: ${optionNumber}, resolved as: ${optionName}`)
        })
        .catch(err => {
            logger.error(`Unknown DHCP option ID: ${optionNumber}, Kricco was unable to resolve the name`, err)
        })
    
    const relatedBufferSlice = DhcpOption.getBufferSlice(buffer.slice(offset))
    DhcpOption.parseOptionSize(relatedBufferSlice)
    const newOffset = offset + METADATA_PAYLOAD_SIZE + DhcpOption.parseOptionSize(relatedBufferSlice)
    return getNextOption(
        buffer,
        newOffset,
        accumulatedOptions
    )
}

module.exports = {getOptions, serializeOptions}