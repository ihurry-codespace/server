import { AddUser } from '@data/use-cases/DbAddUser'
import { UserRepository } from '@infra/db/mysql/UserRepository'
import { EmailValidatorAdapter } from '@infra/EmailValidatorAdapter'
import { EncryptorAdapter } from '@infra/EncryptorAdapter'
import { IdGeneratorAdapter } from '@infra/IdGenerator'
import { SignupUserController } from '@presentation/controllers/SignupUserController'

export function makeSignupUserController (): SignupUserController {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addUserRepository = new UserRepository()
  const findUserRepository = new UserRepository()
  const hash = new EncryptorAdapter()
  const idGenerator = new IdGeneratorAdapter()

  const addUser = new AddUser(
    addUserRepository,
    findUserRepository,
    hash,
    idGenerator
  )

  return new SignupUserController(
    addUser,
    emailValidatorAdapter
  )
}
