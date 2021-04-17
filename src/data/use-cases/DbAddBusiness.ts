import { UserNotFoundException } from '@data/exceptions'
import { AddBusiness } from '@domain/usecases/AddBusiness'
import { AddBusinessRepository, FindUserByIdRepository, IdGenerator } from './interfaces'

export class DbAddBusiness implements AddBusiness {
  constructor (
    private readonly addBusinessRepository: AddBusinessRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async save (business: AddBusiness.Params): Promise<AddBusiness.Result> {
    const user = await this.findUserByIdRepository.findById(business.user_id)

    if (!user) {
      throw new UserNotFoundException()
    }

    const { name, description, avatar, user_id: userId } = business

    const newBusiness = await this.addBusinessRepository.add({
      id: this.idGenerator.uuid(),
      user_id: userId,
      name,
      description,
      avatar
    })

    return newBusiness
  }
}
