const config = require('./jest.config')
config.displayName = 'INTEGRATION'
config.testMatch = ['**/*.spec.ts']
module.exports = config
