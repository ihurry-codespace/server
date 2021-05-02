import { AddUserWithTokenRepository, FindUserByTokenRepository } from '@data/use-cases/interfaces'
import { MemoryDatabase } from '@infra/adapters/RedisAdapter'

export class UserRepository implements FindUserByTokenRepository, AddUserWithTokenRepository {
  private readonly client = MemoryDatabase.getClient()

  async findByToken (token: FindUserByTokenRepository.Params): FindUserByTokenRepository.Result {
    const result = await this.client.get<FindUserByTokenRepository.Result>(token)

    return result
  }

  async addToken (body: AddUserWithTokenRepository.Params): AddUserWithTokenRepository.Result {
    const { id, name, token } = body

    await this.client.set(token, { id, name })
  }
}
