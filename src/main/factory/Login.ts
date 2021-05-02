import { EncryptorAdapter, I18nAdapter, TokenAdapter } from '@infra/adapters'
import { TranslateErrorMessageDecorator } from '@main/decorators/TranslateErrorMessageDecorator'
import { LogDecorator } from '@main/decorators/LogDecorator'
import { LoginController } from '@presentation/controllers/LoginController'
import { Controller } from '@presentation/interfaces/Controller'
import { DbUserAuthorization } from '@data/use-cases/DbUserAuthorization'
import { UserRepository } from '@infra/db/mysql/repositories'
import { UserRepository as UserInMemoryRepository } from '@infra/db/redis/repositories'

export function makeLogin (): Controller {
  const findUserRepository = new UserRepository()
  const findUserInMemoryRepository = new UserInMemoryRepository()
  const hash = new EncryptorAdapter()
  const token = new TokenAdapter()

  const dbUserAuthorization = new DbUserAuthorization(
    findUserRepository,
    hash,
    token,
    findUserInMemoryRepository
  )
  const i18n = I18nAdapter.i18n()

  const mainController = new LogDecorator(
    new TranslateErrorMessageDecorator(new LoginController(dbUserAuthorization), i18n)
  )

  return mainController
}
