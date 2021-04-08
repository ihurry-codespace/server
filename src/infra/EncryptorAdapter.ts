import { Encryptor } from '@data/use-cases/interfaces'
import bcrypt from 'bcrypt'

export class EncryptorAdapter implements Encryptor {
  async encrypt (value: string, salt: number = 10): Promise<string> {
    const hash = await bcrypt.hash(value, salt)

    return hash
  }
}
