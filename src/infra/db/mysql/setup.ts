import { config } from '@infra/ConfigAdapter'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'

export async function mainConnection (): Promise<Connection> {
  console.log('config.getDbConfig() => ', config.getDbConfig())
  return await createConnection(config.getDbConfig() as ConnectionOptions)
}
