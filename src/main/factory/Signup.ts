import { AddUser } from '@data/use-cases/DbAddUser'
import { UserRepository } from '@infra/db/mysql/UserRepository'
import { EmailValidatorAdapter } from '@infra/EmailValidatorAdapter'
import { EncryptorAdapter } from '@infra/EncryptorAdapter'
import { I18nAdapter } from '@infra/I18nAdapter'
import { IdGeneratorAdapter } from '@infra/IdGenerator'
import { TokenAdapter } from '@infra/TokenAdapter'
import { SignupUserController } from '@presentation/controllers/SignupUserController'

export function makeSignupUserController (): SignupUserController {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addUserRepository = new UserRepository()
  const findUserRepository = new UserRepository()
  const hash = new EncryptorAdapter()
  const idGenerator = new IdGeneratorAdapter()
  const token = new TokenAdapter()

  const addUser = new AddUser(
    addUserRepository,
    findUserRepository,
    hash,
    idGenerator,
    token
  )

  const i18n = I18nAdapter.i18n()

  return new SignupUserController(
    i18n,
    addUser,
    emailValidatorAdapter
  )
}
