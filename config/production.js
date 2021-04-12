const { join } = require('path')

const entityPath = join(__dirname, '../dist/**/entity/*.js')
const migrationPath = join(__dirname, '../dist/**/migration/*.js')
const subscriberPath = join(__dirname, '../dist/**/subscriber/*.js')

module.exports = {
  dbConfig: {
    main: {
      entities: [entityPath],
      subscribers: [subscriberPath],
      migrations: [migrationPath]
    }
  }
}
