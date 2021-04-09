const { join } = require('path')

const entityPath = join(__dirname, '../../**/entity/*.ts')
const migrationPath = join(__dirname, '../../**/migration/*.ts')
const subscriberPath = join(__dirname, '../../**/subscriber/*.ts')

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
      migrations: [migrationPath],
      cli: {
        entitiesDir: 'src/infra/db/mysql/entity',
        migrationsDir: 'src/infra/db/mysql/migration',
        subscribersDir: 'src/infra/db/mysql/subscriber'
      }
    }
  }
}
