import { AddJob } from '@domain/usecases/AddJob'
import { NotPossibleToCreateJobError } from '@presentation/errors/NotPossibleToCreateJobError'
import { badRequest, errorManager, ok } from '@presentation/helpers/http-helper'
import { Controller } from '@presentation/interfaces/Controller'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

export class AddJobControllers implements Controller {
  constructor (
    private readonly addJobRepository: AddJob
  ) {}

  async handle (httpRequest: HttpRequest<AddJob.Params>): Promise<HttpResponse<AddJob.Result>> {
    try {
      const {
        title,
        description,
        salary_range_max: salaryRangeMax,
        salary_range_min: salaryRangeMin,
        is_private: isPrivate,
        is_active: isActive,
        quantity,
        career_id: careerId,
        career_seniority_id: careerSeniorityId,
        flow_id: flowId,
        business_owner_id: ownerId

      } = httpRequest.body

      const result = await this.addJobRepository.add({
        title,
        description,
        quantity,
        salary_range_max: salaryRangeMax,
        salary_range_min: salaryRangeMin,
        is_private: isPrivate,
        is_active: isActive,
        career_id: careerId,
        career_seniority_id: careerSeniorityId,
        business_owner_id: ownerId,
        flow_id: flowId
      })

      if (!result) return badRequest(new NotPossibleToCreateJobError())

      return ok(result)
    } catch (error) {
      return errorManager(error)
    }
  }
}
