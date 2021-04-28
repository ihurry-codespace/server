import { UserNotFoundException } from '@data/exceptions'
import { AuthToken, AuthTokenVerify } from '@domain/usecases/AuthToken'
import { AuthUser } from '@domain/usecases/AuthUser'
import { EncryptorCompare, FindUserByEmailRepository, FindUserByIdRepository } from './interfaces'

export class DbAuthUser implements AuthUser, AuthTokenVerify {
  constructor (
    private readonly findUserRepository: FindUserByEmailRepository,
    private readonly hash: EncryptorCompare,
    private readonly tokenGenerator: AuthToken,
    private readonly tokenValidator: AuthTokenVerify,
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}

  public async login (user: AuthUser.Params): Promise<AuthUser.Result> {
    const dbUser = await this.findUserRepository.findByEmail(user.email)
    if (!dbUser) return null

    const isValidPassword = await this.hash.compare(user.password, dbUser.password)
    if (!isValidPassword) return null

    const { id, name } = dbUser
    // TODO INCLUIR TOKEN NO CACHE DO REDIS
    const token = await this.tokenGenerator.generate({
      id,
      name
    })

    return token
  }

  public async validate (token: AuthTokenVerify.Params): Promise<AuthTokenVerify.Result> {
    const result = await this.tokenValidator.validate(token)
    // TODO DEVE VERIFICAR SE O TOKEN EXISTE NA CAMADA DE CACHE DO REDIS
    const userIsValid = await this.findUserByIdRepository.findById(result.id)

    if (!userIsValid) {
      throw new UserNotFoundException()
    }

    return result
  }
}
