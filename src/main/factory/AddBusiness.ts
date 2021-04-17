import { DbAddBusiness } from '@data/use-cases/DbAddBusiness'
import { BusinessRepository } from '@infra/db/mysql/BusinessRepository'
import { UserRepository } from '@infra/db/mysql/UserRepository'
import { I18nAdapter } from '@infra/I18nAdapter'
import { IdGeneratorAdapter } from '@infra/IdGenerator'
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
