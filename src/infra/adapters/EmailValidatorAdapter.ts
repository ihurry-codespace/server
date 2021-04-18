import { EmailValidator } from '../interfaces'
import isEmail from 'validator/lib/isEmail'

export class EmailValidatorAdapter implements EmailValidator {
  validate (email: string = ''): boolean {
    return isEmail(email)
  }
}
