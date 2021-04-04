export class EncryptorAdapter {
  encrypt(value: string) {
    return encodeURIComponent(value);
  }
}
