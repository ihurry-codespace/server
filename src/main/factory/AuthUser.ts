import { DbAuthUser } from '@data/use-cases/DbAuthUser'
import { EncryptorAdapter, TokenAdapter } from '@infra/adapters'
import { UserRepository } from '@infra/db/mysql/repositories'

export function makeAuthUser (_roles: string[] = []): DbAuthUser {
  const findUserRepository = new UserRepository()
  const hash = new EncryptorAdapter()
  const token = new TokenAdapter()
  const dbAuthUser = new DbAuthUser(
    findUserRepository,
    hash,
    token,
    token,
    findUserRepository
  )

  return dbAuthUser
}
