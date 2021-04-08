import { AddUserRepository, FindUserRepository, UserModel } from '@data/use-cases/interfaces'

export class UserRepository implements AddUserRepository, FindUserRepository {
  async add (userModel: UserModel): Promise<Omit<UserModel, 'password'>> {
    const { password, ...rest } = userModel
    return await Promise.resolve(rest)
  }

  async findByEmail (_email: string): Promise<Omit<UserModel, 'password'> | null> {
    return await Promise.resolve(null)
  }
}
