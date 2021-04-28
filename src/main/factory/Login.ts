import { I18nAdapter } from '@infra/adapters'
import { TranslateErrorMessageDecorator } from '@main/decorators/TranslateErrorMessageDecorator'
import { LogDecorator } from '@main/decorators/LogDecorator'
import { LoginController } from '@presentation/controllers/LoginController'
import { Controller } from '@presentation/interfaces/Controller'
import { makeAuthUser } from './AuthUser'

export function makeLogin (): Controller {
  const dbAuthUser = makeAuthUser()
  const i18n = I18nAdapter.i18n()

  const mainController = new LogDecorator(
    new TranslateErrorMessageDecorator(new LoginController(dbAuthUser), i18n)
  )

  return mainController
}
