import configBase from 'config'
import { AppConfig, DbMain, TokenConfig } from '../interfaces'

export const config = {
  getDbConfig (): DbMain {
    return configBase.get('dbConfig.main')
  },
  getTokenConfig (): TokenConfig {
    return configBase.get('tokenConfig')
  },
  getAppConfig (): AppConfig {
    return configBase.get('appConfig')
  }
}
