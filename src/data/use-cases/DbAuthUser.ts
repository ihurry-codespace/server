import { AuthToken } from '@domain/usecases/AuthToken'
import { AuthUser } from '@domain/usecases/AuthUser'
import { EncryptorCompare, FindUserRepository } from './interfaces'

export class DbAuthUser implements AuthUser {
  constructor (
    private readonly findUserRepository: FindUserRepository,
    private readonly hash: EncryptorCompare,
    private readonly token: AuthToken
  ) {}

  public async login (user: AuthUser.Params): Promise<AuthUser.Result> {
    const dbUser = await this.findUserRepository.findByEmail(user.email)
    if (!dbUser) throw new Error('User not found')

    const isValidPassword = await this.hash.compare(user.password, dbUser.password)
    if (!isValidPassword) throw new Error('Password incorrect')

    const { id, name } = dbUser
    const token = await this.token.generate({
      id,
      name
    })

    return token
  }
}