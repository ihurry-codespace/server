import { CommonUser } from '@domain/entities/User'

export interface AddCommonUser {
  add: (user: Omit<CommonUser, 'id'>) => Promise<Omit<CommonUser, 'password'>>
}

export namespace AddCommonUser {
  export type Params = Omit<CommonUser, 'id'>

  export type Result = Omit<CommonUser, 'password'>
}
