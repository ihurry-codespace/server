import { Encryptor, EncryptorCompare } from '@data/use-cases/interfaces'
import bcrypt from 'bcrypt'

export class EncryptorAdapter implements Encryptor, EncryptorCompare {
  async encrypt (value: string, salt: number = 10): Promise<string> {
    const hash = await bcrypt.hash(value, salt)

    return hash
  }

  async compare (value: string, encryptedValue: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, encryptedValue)

    return isEqual
  }
}
