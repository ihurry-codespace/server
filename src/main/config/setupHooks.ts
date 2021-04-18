import { I18nAdapter } from '@infra/adapters'
import { FastifyInstance } from 'fastify'

export async function setupHooks (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', (request, _reply, done) => {
    I18nAdapter
      .i18n()
      .findAndSetLocale(request)

    done()
  })
}
