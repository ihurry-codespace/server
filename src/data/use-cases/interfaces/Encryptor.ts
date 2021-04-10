export interface Encryptor {
  encrypt: (value: string) => Promise<string>
}

export interface EncryptorCompare {
  compare: (value: string, encryptedValue: string) => Promise<boolean>
}
