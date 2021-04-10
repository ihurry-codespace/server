const { join } = require('path')

const entityPath = join(__dirname, '../dist/**/entity/*.js')
const migrationPath = join(__dirname, '../dist/**/migration/*.js')
const subscriberPath = join(__dirname, '../dist/**/subscriber/*.js')

module.exports = {
  dbConfig: {
    main: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysql',
      password: 'supersecret',
      database: 'ihurry',
      synchronize: true,
      logging: false,
      entities: [entityPath],
      subscribers: [subscriberPath],
      migrations: [migrationPath]
    }
  }
}
