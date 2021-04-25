import { Job } from '@domain/entities/Job'

export interface AddJobRepository {
  save: (job: AddJobRepository.Params) => AddJobRepository.Result
}

export namespace AddJobRepository {
  export type Params = Omit<Job, 'id'>
  export type Result = Promise<Job>
}
