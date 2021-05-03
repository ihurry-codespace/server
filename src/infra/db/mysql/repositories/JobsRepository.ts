import { getRepository } from 'typeorm'
import { AddJobRepository, JobModel } from '@data/use-cases/interfaces'
import { Job } from '../entities'

export class JobsRepository implements AddJobRepository {
  private readonly defaultConnectionName = 'default'

  async save (jobModel: AddJobRepository.Params): AddJobRepository.Result {
    const result = await getRepository(Job, this.defaultConnectionName).insert({
      ...jobModel,
      careerSeniority: {
        id: jobModel.career_seniority_id
      },
      businessOwner: {
        id: jobModel.business_owner_id
      },
      career: {
        id: jobModel.career_id
      },
      flow: {
        id: jobModel.flow_id
      }
    })
    const insertedId = result.identifiers.find(identifier => identifier.id)
    const {
      id,
      title,
      description,
      quantity,
      salary_range_max: salaryRangeMax,
      salary_range_min: salaryRangeMin,
      is_private: isPrivate,
      is_active: isActive,
      business_owner_id: businessOwnerId,
      career_seniority_id: careerSeniorityId,
      career_id: careerId,
      flow_id: flowId
    } = await getRepository(Job, this.defaultConnectionName).findOne(insertedId) as unknown as JobModel

    return {
      id,
      title,
      description,
      quantity,
      salary_range_max: salaryRangeMax,
      salary_range_min: salaryRangeMin,
      is_private: isPrivate,
      is_active: isActive,
      business_owner_id: businessOwnerId,
      career_id: careerId,
      career_seniority_id: careerSeniorityId,
      flow_id: flowId
    }
  }
}
