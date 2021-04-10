export interface AuthToken {
  generate: (user: AuthToken.Params) => Promise<AuthToken.Result>
}

export namespace AuthToken {
  export interface Params {
    id: string
    name: string
  }

  export interface Result { token: string}
}
