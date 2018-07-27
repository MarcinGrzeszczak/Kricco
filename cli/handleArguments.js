function handleArguments() {
    const meow = require('meow')
    const helpText = require('./cliHelp')
    const flagsOptions = require('./flags')
    return meow(helpText, flagsOptions)
}

module.exports = handleArguments