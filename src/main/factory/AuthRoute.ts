import { DbUserAuthentication } from '@data/use-cases/DbUserAuthentication'
import { TokenAdapter } from '@infra/adapters'
import { UserRepository } from '@infra/db/mysql/repositories'
import { Middleware } from '@presentation/interfaces/Middleware'
import { AuthMiddleware } from '@presentation/middlewares/Auth'
import { UserRepository as UserInMemoryRepository } from '@infra/db/redis/repositories'

export function makeAuthentication (roles: string[]): Middleware {
  const token = new TokenAdapter()
  const findUserRepository = new UserRepository()
  const findUserInMemoryRepository = new UserInMemoryRepository()

  const dbAuthUser = new DbUserAuthentication(
    token,
    findUserRepository,
    findUserInMemoryRepository
  )
  const authMiddleware = new AuthMiddleware(dbAuthUser)

  return authMiddleware
}
