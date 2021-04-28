import { getRepository } from 'typeorm'
import { FindBusinessOwnerByIdRepository } from '@data/use-cases/interfaces'
import { BusinessOwner } from '../entities'

export class BusinessOwnerRepository implements FindBusinessOwnerByIdRepository {
  private readonly defaultConnectionName = 'default'

  async findById (id: string): FindBusinessOwnerByIdRepository.Result {
    const user = await getRepository(BusinessOwner, this.defaultConnectionName).findOne({ where: { id } })

    if (user) {
      const { id } = user
      return { id }
    }

    return null
  }
}
