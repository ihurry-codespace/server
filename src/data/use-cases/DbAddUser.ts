import { AddCommonUser } from "@domain/usecases/AddCommonUser";
import { Encryptor, IdGenerator } from "@infra/interfaces";
import { AddUserRepository, FindUserRepository } from "./interfaces";

export class AddUser implements AddCommonUser {

  constructor(
    private readonly addUserRepository: AddUserRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly hash: Encryptor,
    private readonly idGenerator: IdGenerator,
  ) {}

  async add(user: AddCommonUser.Params): Promise<AddCommonUser.Result> {
    const existentUser = await this.findUserRepository.findByEmail(user.email)

    if (existentUser) {
      return existentUser
    }

    const userModel = {
      id: this.idGenerator.uuid(),
      name: user.name,
      email: user.email,
      password: await this.hash.encrypt(user.password),
      avatar: user.avatar
    }

    return await this.addUserRepository.add(userModel)
  }
}
