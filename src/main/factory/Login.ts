import { DbAuthUser } from '@data/use-cases/DbAuthUser'
import { UserRepository } from '@infra/db/mysql/UserRepository'
import { EncryptorAdapter } from '@infra/EncryptorAdapter'
import { I18nAdapter } from '@infra/I18nAdapter'
import { TokenAdapter } from '@infra/TokenAdapter'
import { LoginController } from '@presentation/controllers/LoginController'

export function makeLogin (): LoginController {
  const findUserRepository = new UserRepository()
  const hash = new EncryptorAdapter()
  const token = new TokenAdapter()
  const dbAuthUser = new DbAuthUser(
    findUserRepository,
    hash,
    token
  )
  const i18n = I18nAdapter.i18n()

  return new LoginController(i18n, dbAuthUser)
}
