import { Connection, createConnection } from 'typeorm'
import { join } from 'path'

export class DatabaseTestUtils {
  private static instance: DatabaseTestUtils

  private constructor (
    private connection?: Connection
  ) { }

  static getInstance (): DatabaseTestUtils {
    if (!DatabaseTestUtils.instance) {
      DatabaseTestUtils.instance = new DatabaseTestUtils()
    }

    return DatabaseTestUtils.instance
  }

  static async connect (): Promise<void> {
    const entityPath = join(__dirname, '../../**/entity/*.ts')
    const migrationPath = join(__dirname, '../../**/migration/*.ts')
    const subscriberPath = join(__dirname, '../../**/subscriber/*.ts')

    if (!DatabaseTestUtils.getInstance().connection) {
      DatabaseTestUtils.getInstance().connection = await createConnection({
        type: 'sqlite',
        database: 'ihurry.sqlite',
        synchronize: true,
        logging: false,
        entities: [entityPath],
        subscribers: [subscriberPath],
        migrations: [migrationPath]
      })
    }
  }

  static async close (): Promise<void> {
    await DatabaseTestUtils.getInstance().connection?.close()
  }

  static async dropDatabase (): Promise<void> {
    await DatabaseTestUtils.getInstance().connection?.dropDatabase()
  }
}
