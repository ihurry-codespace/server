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
      entities: ['src/infra/db/mysql/entity/*.ts'],
      subscribers: ['src/infra/db/mysql/subscriber/*.ts'],
      migrations: ['src/infra/db/mysql/migration/*.ts'],
      cli: {
        entitiesDir: 'src/infra/db/mysql/entity',
        migrationsDir: 'src/infra/db/mysql/migration',
        subscribersDir: 'src/infra/db/mysql/subscriber'
      }
    }
  }
}
