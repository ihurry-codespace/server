export class DuplicateUserException extends Error {
  constructor () {
    super('There is already a user registered with this email')
    this.name = 'DuplicateUserException'
  }
}
