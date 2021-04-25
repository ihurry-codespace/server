import { Job } from '@domain/entities'

export interface AddJob {
  add: (job: Omit<Job, 'id'>) => Promise<Job>
}

export namespace AddJob {
  export type Params = Omit<Job, 'id'>
  export interface Result extends Job {}
}
