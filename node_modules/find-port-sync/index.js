module.exports = () => +require('child_process').execSync(`${JSON.stringify(process.execPath)} ${require.resolve('get-port-cli/cli')}`)
