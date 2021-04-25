import { Exception } from './Exception'

export class SalaryRangeException extends Exception {
  constructor () {
    super('Salary range is incorrect')
    this.name = 'SalaryRangeException'
  }
}
