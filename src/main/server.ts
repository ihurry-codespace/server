import { config } from '@infra/adapters/ConfigAdapter'
import { mainConnection } from '@infra/db/mysql/setup'
import app from '@main/config/app'

export const startServer = async (): Promise<void> => {
  try {
    console.log('⬜ Connecting database...')
    await mainConnection()
    console.log('✅ Connected database')

    const { HOST, PORT } = config.getAppConfig()
    app.listen({
      port: PORT,
      host: HOST
    }, (err, address) => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
