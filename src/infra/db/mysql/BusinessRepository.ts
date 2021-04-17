import { getManager } from 'typeorm'
import { Business } from './entity/Business'
import { AddBusinessRepository } from '@data/use-cases/interfaces'
import { BusinessOwner } from './entity/BusinessOwner'

export class BusinessRepository implements AddBusinessRepository {
  async add (data: AddBusinessRepository.Params): Promise<AddBusinessRepository.Result> {
    const result = await getManager().transaction<AddBusinessRepository.Result>(async transactionalEntityManager => {
      const { user_id: userId, ...onlyBusinessData } = data
      await transactionalEntityManager.getRepository(Business).insert(onlyBusinessData)

      await transactionalEntityManager.getRepository(BusinessOwner).insert({
        user_id: userId,
        business_id: onlyBusinessData.id
      })

      return {
        id: onlyBusinessData.id,
        name: data.name,
        description: data.description,
        avatar: data.avatar
      }
    })

    return result
  }
}
