import { AuthToken } from '@domain/usecases'

export { AuthToken, AuthTokenVerify } from '@domain/usecases'

export interface AddUserWithTokenRepository {
  addToken: (body: AddUserWithTokenRepository.Params) => AddUserWithTokenRepository.Result
}

export namespace AddUserWithTokenRepository {
  export interface Params extends AuthToken.Params {
    token: string
  }
  export type Result = Promise<void>
}

export interface FindUserByTokenRepository {
  findByToken: (token: FindUserByTokenRepository.Params) => FindUserByTokenRepository.Result
}

export namespace FindUserByTokenRepository {
  export type Params = string
  export type Result = Promise<AuthToken.Params | null>
}
