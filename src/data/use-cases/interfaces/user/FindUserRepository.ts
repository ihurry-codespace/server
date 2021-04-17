import { UserModel } from './UserModel'

export interface FindUserByEmailRepository {
  findByEmail: (email: string) => Promise<UserModel | null>
}

export interface FindUserByIdRepository {
  findById: (id: string) => Promise<FindUserByIdRepository.Result>
}

export namespace FindUserByIdRepository {
  export type Result = Omit<UserModel, 'password'> | null
}
