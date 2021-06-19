import { MemoryDatabase } from '@infra/adapters/RedisAdapter'

export async function cacheConnection (): Promise<MemoryDatabase> {
  const memoryDatabase = MemoryDatabase.getClient()

  return memoryDatabase
}
