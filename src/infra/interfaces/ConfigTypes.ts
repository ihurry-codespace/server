import jwt from 'jsonwebtoken'

export interface ConfigType {
  dbConfig: DbConfig
}

export interface DbConfig {
  main: DbMain
}

export interface DbMain {
  type: string
  host: string
  port: number
  username: string
  password: string
  database: string
  synchronize: boolean
  logging: boolean
  entities: string[]
  subscribers: string[]
  migrations: string[]
  cli: DBCli
}

export interface DBCli {
  entitiesDir: string
  migrationsDir: string
  subscribersDir: string
}

export interface TokenConfig {
  privateKey: string
  expiresIn: string
  algorithm: jwt.Algorithm
}

export interface AppConfig {
  PORT: number
  HOST: string
}
