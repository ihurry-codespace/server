import { DbAddBusiness } from '@data/use-cases/DbAddBusiness'
import { BusinessRepository, UserRepository } from '@infra/db/mysql/repositories'
import { I18nAdapter, IdGeneratorAdapter } from '@infra/adapters'
import { LogDecorator } from '@main/decorators/LogDecorator'
import { TranslateErrorMessageDecorator } from '@main/decorators/TranslateErrorMessageDecorator'
import { AddBusinessController } from '@presentation/controllers/AddBusinessController'
import { Controller } from '@presentation/interfaces/Controller'

export function makeAddBusiness (): Controller {
  const i18n = I18nAdapter.i18n()

  const addBusiness = new DbAddBusiness(
    new BusinessRepository(),
    new UserRepository(),
    new IdGeneratorAdapter()
  )

  const mainController = new LogDecorator(
    new TranslateErrorMessageDecorator(
      new AddBusinessController(
        addBusiness
      )
      , i18n)
  )

  return mainController
}
