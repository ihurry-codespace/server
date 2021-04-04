import { UserModel } from "./UserModel";

export interface AddUserRepository {
  add(userModel: UserModel): Promise<Omit<UserModel, 'password'>>
}
