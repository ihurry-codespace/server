import { CommonUser } from '@domain/entities'

export interface AddCommonUser {
  add: (user: Omit<CommonUser, 'id'>) => Promise<Omit<CommonUser, 'password'>>
}

export namespace AddCommonUser {
  export type Params = Omit<CommonUser, 'id'>

  export interface Result extends Omit<CommonUser, 'password'> {
    token: string
  }
}
