import { mainConnection } from '@infra/db/mysql/setup'
import app from '@main/config/app'

export const startServer = async (): Promise<void> => {
  try {
    console.log('⬜ Connecting database...')
    await mainConnection()
    console.log('✅ Connected database')
    app.listen(8080, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
