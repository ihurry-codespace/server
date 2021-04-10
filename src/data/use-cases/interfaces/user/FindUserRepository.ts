import { UserModel } from './UserModel'

export interface FindUserRepository {
  findByEmail: (email: string) => Promise<UserModel | null>
}