import Redis from 'ioredis'
import { config } from './ConfigAdapter'

export class MemoryDatabase {
  private static instance: MemoryDatabase

  private readonly redisClient: Redis.Redis

  private constructor () {
    this.redisClient = new Redis(config.getCacheConfig().host, {
      keyPrefix: 'cache:'
    })

    this.redisClient.on('error', (error) => {
      console.error('ERROR::redisClient =>', error)
    })
  }

  public static getClient (): MemoryDatabase {
    if (!MemoryDatabase.instance) {
      MemoryDatabase.instance = new MemoryDatabase()
    }

    return MemoryDatabase.instance
  }

  public async get<T = null> (key: Redis.KeyType): Promise<T | null> {
    const value = await this.redisClient.get(key)

    return value ? JSON.parse(value) : null
  }

  public async set (key: Redis.KeyType, value: unknown, expiration: number | null = null): Promise<void> {
    const stringValue = JSON.stringify(value)

    if (expiration) {
      await this.redisClient.set(key, stringValue, 'EX', expiration)
    } else {
      await this.redisClient.set(key, stringValue)
    }
  }

  public async delete (...keys: Redis.KeyType[]): Promise<void> {
    await this.redisClient.del(...keys)
  }
}
