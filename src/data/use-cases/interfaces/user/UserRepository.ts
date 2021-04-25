import { UserModel } from '../models/UserModel'

export interface AddUserRepository {
  add: (userModel: AddUserRepository.Params) => AddUserRepository.Result
}
export namespace AddUserRepository {
  export type Params = Omit<UserModel, 'created_at' | 'updated_at'>
  export type Result = Promise<Omit<UserModel, 'password' | 'created_at' | 'updated_at'>>
}

export interface FindUserByEmailRepository {
  findByEmail: (email: FindUserByEmailRepository.Params) => FindUserByEmailRepository.Result
}
export namespace FindUserByEmailRepository {
  export type Params = string
  export type Result = Promise<Omit<UserModel, 'created_at' | 'updated_at'> | null>
}

export interface FindUserByIdRepository {
  findById: (id: FindUserByIdRepository.Params) => Promise<FindUserByIdRepository.Result>
}
export namespace FindUserByIdRepository {
  export type Params = string
  export type Result = Omit<UserModel, 'password' | 'created_at' | 'updated_at'> | null
}
