import { AuthToken } from '@domain/usecases/AuthToken'
import jwt from 'jsonwebtoken'

export class TokenAdapter implements AuthToken {
  private readonly algorithm: jwt.Algorithm
  private readonly expiresIn: string
  private readonly privateKey: string

  constructor () {
    this.algorithm = 'HS256'
    this.expiresIn = '24h'
    this.privateKey = 'super-secret'
  }

  async generate (user: AuthToken.Params): Promise<AuthToken.Result> {
    const token = await this.generateToken(user)

    return {
      token
    }
  }

  private async generateToken (data: any): Promise<string> {
    return await new Promise((resolve, reject) => {
      jwt.sign(
        data,
        this.privateKey,
        {
          algorithm: this.algorithm,
          expiresIn: this.expiresIn
        },
        (err, token) => {
          if (err) return reject(err)

          return resolve(token as string)
        })
    })
  }
}
