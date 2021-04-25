import { getManager } from 'typeorm'
import { AddBusinessRepository, BusinessOwnerRole, UserRole } from '@data/use-cases/interfaces'
import { Business, BusinessOwner, User } from '../entities'

export class BusinessRepository implements AddBusinessRepository {
  async add (data: AddBusinessRepository.Params): Promise<AddBusinessRepository.Result> {
    const result = await getManager().transaction<AddBusinessRepository.Result>(async transactionalEntityManager => {
      const { user_id: userId, ...businessData } = data
      await transactionalEntityManager.getRepository(Business).insert(businessData)

      await transactionalEntityManager.getRepository(BusinessOwner).insert({
        user: {
          id: userId
        },
        role: BusinessOwnerRole.ADMIN,
        business: businessData.id
      })

      await transactionalEntityManager.getRepository(User).update({ id: userId }, { role: UserRole.ADMIN })

      return {
        id: businessData.id,
        name: data.name,
        description: data.description,
        avatar: data.avatar
      }
    })

    return result
  }
}
