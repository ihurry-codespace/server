import { DbAddUser } from '@data/use-cases/DbAddUser'
import { UserRepository } from '@infra/db/mysql/repositories'
import { EmailValidatorAdapter, EncryptorAdapter, I18nAdapter, IdGeneratorAdapter, TokenAdapter } from '@infra/adapters'
import { LogDecorator } from '@main/decorators/LogDecorator'
import { TranslateErrorMessageDecorator } from '@main/decorators/TranslateErrorMessageDecorator'
import { SignupUserController } from '@presentation/controllers/SignupUserController'
import { Controller } from '@presentation/interfaces/Controller'

export function makeSignupUserController (): Controller {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addUserRepository = new UserRepository()
  const findUserRepository = new UserRepository()
  const hash = new EncryptorAdapter()
  const idGenerator = new IdGeneratorAdapter()
  const token = new TokenAdapter()
  const i18n = I18nAdapter.i18n()

  const addUser = new DbAddUser(
    addUserRepository,
    findUserRepository,
    hash,
    idGenerator,
    token
  )

  const mainController = new LogDecorator(
    new TranslateErrorMessageDecorator(
      new SignupUserController(
        addUser,
        emailValidatorAdapter
      )
      , i18n)
  )

  return mainController
}
