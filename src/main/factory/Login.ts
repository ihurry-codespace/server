import { DbAuthUser } from '@data/use-cases/DbAuthUser'
import { UserRepository } from '@infra/db/mysql/UserRepository'
import { EncryptorAdapter } from '@infra/EncryptorAdapter'
import { I18nAdapter } from '@infra/I18nAdapter'
import { TokenAdapter } from '@infra/TokenAdapter'
import { TranslateErrorMessageDecorator } from '@main/decorators/TranslateErrorMessageDecorator'
import { LogDecorator } from '@main/decorators/LogDecorator'
import { LoginController } from '@presentation/controllers/LoginController'
import { Controller } from '@presentation/interfaces/Controller'

export function makeLogin (): Controller {
  const findUserRepository = new UserRepository()
  const hash = new EncryptorAdapter()
  const token = new TokenAdapter()
  const dbAuthUser = new DbAuthUser(
    findUserRepository,
    hash,
    token
  )
  const i18n = I18nAdapter.i18n()

  const mainController = new LogDecorator(
    new TranslateErrorMessageDecorator(new LoginController(dbAuthUser), i18n)
  )

  return mainController
}
