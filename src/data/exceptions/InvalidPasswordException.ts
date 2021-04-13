import { Exception } from './Exception'

export class InvalidPasswordException extends Exception {
  constructor () {
    super('User not found')
    this.name = 'InvalidPasswordException'
  }
}
