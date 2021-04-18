export interface AuthUser {
  login: (user: AuthUser.Params) => Promise<AuthUser.Result>
}

export namespace AuthUser {
  export interface Params {
    email: string
    password: string
  }

  export type Result = { token: string} | null
}
