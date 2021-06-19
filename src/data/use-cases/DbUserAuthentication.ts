import { UserNotFoundException } from '@data/exceptions'
import { AuthTokenVerify } from '@domain/usecases/AuthToken'
import { FindUserByIdRepository, FindUserByTokenRepository } from './interfaces'

export class DbUserAuthentication implements AuthTokenVerify {
  constructor (
    private readonly tokenValidator: AuthTokenVerify,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findUserByToken: FindUserByTokenRepository
  ) {}

  public async validate (value: AuthTokenVerify.Params): Promise<AuthTokenVerify.Result> {
    const result = await this.tokenValidator.validate(value)

    const inMemoryRsult = await this.findUserByToken.findByToken(value.token)
    if (inMemoryRsult) {
      return inMemoryRsult
    }

    const userIsValid = await this.findUserByIdRepository.findById(result.id)

    if (!userIsValid) {
      throw new UserNotFoundException()
    }

    return result
  }
}
