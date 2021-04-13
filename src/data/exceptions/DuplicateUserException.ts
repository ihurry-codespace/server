import { Exception } from './Exception'

export class DuplicateUserException extends Exception {
  constructor () {
    super('There is already a user registered with this email')
    this.name = 'DuplicateUserException'
  }
}
