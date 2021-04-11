import { AuthToken } from '@domain/usecases/AuthToken'
import jwt from 'jsonwebtoken'
import { config } from './ConfigAdapter'

export class TokenAdapter implements AuthToken {
  private readonly algorithm: jwt.Algorithm
  private readonly expiresIn: string
  private readonly privateKey: string

  constructor () {
    const { algorithm, expiresIn, privateKey } = config.getTokenConfig()

    this.algorithm = algorithm
    this.expiresIn = expiresIn
    this.privateKey = privateKey
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
