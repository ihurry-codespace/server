import { UserNotFoundException, SalaryRangeException } from '@data/exceptions'
import { AddJob } from '@domain/usecases/AddJob'
import { AddJobRepository, FindBusinessOwnerByIdRepository } from './interfaces'

export class DbAddJob implements AddJob {
  constructor (
    private readonly jobRepository: AddJobRepository,
    private readonly ownerRepository: FindBusinessOwnerByIdRepository
  ) {}

  async add (body: AddJob.Params): Promise<AddJob.Result> {
    const job = { ...body }

    const isValid = await this.ownerRepository.findById(job.business_owner_id)
    if (!isValid) throw new UserNotFoundException()

    if (job.salary_range_min >= job.salary_range_max) {
      throw new SalaryRangeException()
    }

    const result = await this.jobRepository.save(job)
    return result
  }
}
