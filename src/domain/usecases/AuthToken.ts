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

export interface AuthTokenVerify {
  validate: (token: AuthTokenVerify.Params) => Promise<AuthTokenVerify.Result>
}

export namespace AuthTokenVerify {
  export interface Params {
    token: string
  }

  export interface Result {
    id: string
    name: string
  }
}
