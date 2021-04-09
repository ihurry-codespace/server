import configBase from 'config'
import { DbMain } from './interfaces'

export const config = {
  getDbConfig (): DbMain {
    return configBase.get('dbConfig.main')
  }
}
