import { getRepository } from 'typeorm'
import { User } from './entity/User'
import { AddUserRepository, FindUserRepository, UserModel } from '@data/use-cases/interfaces'

export class UserRepository implements AddUserRepository, FindUserRepository {
  private readonly defaultConnectionName = 'main'

  async add (userModel: UserModel): Promise<Omit<UserModel, 'password'>> {
    const result = await getRepository(User, this.defaultConnectionName).insert(userModel)
    const insertedId = result.identifiers.find(identifier => identifier.id)
    const { name, avatar, email, id } = await getRepository(User, this.defaultConnectionName).findOne(insertedId) as UserModel

    return { name, avatar, email, id }
  }

  async findByEmail (email: string): Promise<Omit<UserModel, 'password'> | null> {
    const user = await getRepository(User, this.defaultConnectionName).findOne({ where: { email } })

    if (user) {
      const { name, avatar, email, id } = user
      return { name, avatar, email, id }
    }

    return null
  }
}
