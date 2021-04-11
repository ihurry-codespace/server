export class InvalidPasswordException extends Error {
  constructor () {
    super('User not found')
    this.name = 'InvalidPasswordException'
  }
}
