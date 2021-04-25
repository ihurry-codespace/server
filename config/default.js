const { join } = require('path')

const entityPath = join(__dirname, '../../**/entities/*.ts')
const migrationPath = join(__dirname, '../../**/migration/*.ts')
const subscriberPath = join(__dirname, '../../**/subscriber/*.ts')

module.exports = {
  appConfig: {
    PORT: process.env.APP_PORT,
    HOST: process.env.APP_HOST
  },
  tokenConfig: {
    privateKey: process.env.TOKEN_PRIVATE_KEY,
    expiresIn: process.env.TOKEN_EXPIRE_IN,
    algorithm: process.env.TOKEN_ALGORITHM
  },
  dbConfig: {
    main: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      entities: [entityPath],
      subscribers: [subscriberPath],
      migrations: [migrationPath]
    }
  }
}
