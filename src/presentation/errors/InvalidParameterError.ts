export class InvalidParameterError extends Error {
  constructor(paramName: string) {
    super(`Is a invalid param: ${paramName}`)
    this.name = 'InvalidParameterError'
  }
}
