import configBase from 'config'
import { AppConfig, DbMain, TokenConfig, CacheMain } from '../interfaces'

export const config = {
  getDbConfig (): DbMain {
    return configBase.get('dbConfig.main')
  },
  getCacheConfig (): CacheMain {
    return configBase.get('cacheConfig.main')
  },
  getTokenConfig (): TokenConfig {
    return configBase.get('tokenConfig')
  },
  getAppConfig (): AppConfig {
    return configBase.get('appConfig')
  }
}
