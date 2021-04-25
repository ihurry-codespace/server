import { Job } from '@domain/entities'
import { Commons } from './utils'

export interface JobModel extends Commons, Job {}
