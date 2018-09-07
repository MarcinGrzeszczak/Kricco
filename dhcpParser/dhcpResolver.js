const http = require('http')
const _ = require('lodash')

const DHCP_OPTION_DATABASE_URL = 'http://www.iana.org/assignments/bootp-dhcp-parameters/options.csv'
const NEW_LINE_DELIMITER = '\n'
const LINE_SEGMENT_DELIMITER = ','
function resolveDhcpOption(dhcpOptionId) {
    return new Promise((resolve, reject) => {
        http.get(DHCP_OPTION_DATABASE_URL, resp => {
            let data = ''
            resp.setEncoding('utf8')
            resp.on('data', chunk => {
                data += chunk
            })
            
            resp.on('end', () => {
                const resolvedName =
                    splitDataIntoLines(data)
                        .map(splitLineIntoSegments)
                        .map(convertLineToDhcpOptionRecord)
                        .find(testIfNumbersMatch(dhcpOptionId))
                if (!resolvedName) return reject('No matching ID found')
                resolve(resolvedName.message)
            })
        
        }).on("error", err => 
            reject(err.message)
        )
    })
}

function testIfNumbersMatch(numberToTes) {
    return optionRecord => optionRecord.test(numberToTes)
}

function splitDataIntoLines(data) {
    return data.split(NEW_LINE_DELIMITER)
}

function splitLineIntoSegments(line) {
    return line.split(LINE_SEGMENT_DELIMITER)
}

function convertLineToDhcpOptionRecord(line) {
    const DHCP_OPTION_ID_OFFSET = 0
    const NUMBER_RANGE_SIGN = '-' //Ranges of numbers are represented in following manner: 200-210
    const formattedMessage = _.without(line, '').join(', ')

    const dhcpOptionId = line[DHCP_OPTION_ID_OFFSET]
    if (isRangeOfNumbers(NUMBER_RANGE_SIGN, dhcpOptionId)) {
        const splittedByRangeSign = dhcpOptionId.split(NUMBER_RANGE_SIGN)
        const testingNumbers = splittedByRangeSign.map(val => parseInt(val))

        return createDhcpOptionRecord(
            formattedMessage,
            testedNumber =>
                testedNumber >= testingNumbers[0] && testedNumber <= testingNumbers[1]
        )
    }

    const testingNumber = parseInt(line[0])
    return createDhcpOptionRecord(
        formattedMessage,
        testedNumber => testedNumber === testingNumber
    )
}

function createDhcpOptionRecord(message, idTester) {
    return {
        test: idTester,
        message
    }
}

function isRangeOfNumbers(numberRangeSign, dhcpOptionIdString) {
    const splittedByRangeSign = dhcpOptionIdString.split(numberRangeSign)
    return splittedByRangeSign.length === 2
}

module.exports = resolveDhcpOption