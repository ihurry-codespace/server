import { DuplicateUserException } from '@data/exceptions/DuplicateUserException'
import { AddCommonUser } from '@domain/usecases/AddCommonUser'
import { AuthToken } from '@domain/usecases/AuthToken'
import { AddUserRepository, Encryptor, FindUserRepository, IdGenerator } from './interfaces'

export class AddUser implements AddCommonUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly hash: Encryptor,
    private readonly idGenerator: IdGenerator,
    private readonly tokenGenerator: AuthToken
  ) {}

  async add (userData: AddCommonUser.Params): Promise<AddCommonUser.Result> {
    const existentUser = await this.findUserRepository.findByEmail(userData.email)

    if (existentUser) {
      throw new DuplicateUserException()
    }

    const userModel = {
      id: this.idGenerator.uuid(),
      name: userData.name,
      email: userData.email,
      password: await this.hash.encrypt(userData.password),
      avatar: userData.avatar
    }

    const user = await this.addUserRepository.add(userModel)

    const { token } = await this.tokenGenerator.generate({
      id: userModel.id,
      name: userModel.name
    })

    return {
      ...user,
      token
    }
  }
}
