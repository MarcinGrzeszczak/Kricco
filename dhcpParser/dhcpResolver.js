const http = require('http')

const DHCP_OPTION_DATABASE_URL = 'http://www.iana.org/assignments/bootp-dhcp-parameters/options.csv'
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
                    data.split('\n')
                        .map(line => line.split(','))
                        .find(line => parseInt(line[0]) === dhcpOptionId)
                if (!resolvedName) return reject('No matching ID found')
                resolve(resolvedName.join(', '))
            })
        
        }).on("error", err => 
            reject(err.message)
        )
    })
}

module.exports = resolveDhcpOption