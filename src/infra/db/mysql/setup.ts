import { config } from '@infra/adapters/ConfigAdapter'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'

export async function mainConnection (): Promise<Connection> {
  return await createConnection(config.getDbConfig() as ConnectionOptions)
}
