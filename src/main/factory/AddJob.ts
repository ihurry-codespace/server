import { DbAddJob } from '@data/use-cases/DbAddJob'
import { I18nAdapter } from '@infra/adapters'
import { BusinessOwnerRepository } from '@infra/db/mysql/repositories/BusinessOwnerRepository'
import { JobsRepository } from '@infra/db/mysql/repositories/JobsRepository'
import { LogDecorator } from '@main/decorators/LogDecorator'
import { TranslateErrorMessageDecorator } from '@main/decorators/TranslateErrorMessageDecorator'
import { AddJobControllers } from '@presentation/controllers/AddJobControllers'
import { Controller } from '@presentation/interfaces/Controller'

export function makeAddJobController (): Controller {
  const findBusinessOwnerByIdRepository = new BusinessOwnerRepository()
  const addJobRepository = new JobsRepository()
  const jobRepository = new DbAddJob(addJobRepository, findBusinessOwnerByIdRepository)

  const i18n = I18nAdapter.i18n()

  const mainController = new LogDecorator(
    new TranslateErrorMessageDecorator(new AddJobControllers(jobRepository), i18n)
  )

  return mainController
}
