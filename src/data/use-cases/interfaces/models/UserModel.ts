import { CommonUser } from '@domain/entities'
import { Commons } from './utils'

export interface UserModel extends Commons, CommonUser {}
