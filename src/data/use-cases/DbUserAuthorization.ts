import { AuthToken, AuthUser } from '@domain/usecases'
import { AddUserWithTokenRepository, EncryptorCompare, FindUserByEmailRepository } from './interfaces'

export class DbUserAuthorization implements AuthUser {
  constructor (
    private readonly findUserRepository: FindUserByEmailRepository,
    private readonly hash: EncryptorCompare,
    private readonly tokenGenerator: AuthToken,
    private readonly addUserWithToken: AddUserWithTokenRepository
  ) {}

  public async login (user: AuthUser.Params): Promise<AuthUser.Result> {
    const dbUser = await this.findUserRepository.findByEmail(user.email)
    if (!dbUser) return null

    const isValidPassword = await this.hash.compare(user.password, dbUser.password)
    if (!isValidPassword) return null

    const { id, name } = dbUser
    const result = await this.tokenGenerator.generate({
      id,
      name
    })

    await this.addUserWithToken.addToken({
      id,
      name,
      token: result.token
    })

    return result
  }
}
