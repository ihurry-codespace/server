export class EncryptorAdapter {
  encrypt (value: string): string {
    return encodeURIComponent(value)
  }
}
