import { Middleware } from '@presentation/interfaces/Middleware'
import { AuthMiddleware } from '@presentation/middlewares/Auth'
import { makeAuthUser } from './AuthUser'

export function makeAuthentication (roles: string[]): Middleware {
  const dbAuthUser = makeAuthUser(roles)
  const authMiddleware = new AuthMiddleware(dbAuthUser)

  return authMiddleware
}
