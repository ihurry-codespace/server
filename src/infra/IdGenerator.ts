import { IdGenerator } from '@data/use-cases/interfaces'
import { v4 as uuidv4 } from 'uuid'

export class IdGeneratorAdapter implements IdGenerator {
  uuid (): string {
    return uuidv4()
  }
}
