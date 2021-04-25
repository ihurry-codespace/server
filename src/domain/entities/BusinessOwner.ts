import { BusinessOwnerRole, UserStatus } from './utils'

export interface BusinessOwner {
  id: string
  business_id: string
  user_id: string
  status: UserStatus
  role: BusinessOwnerRole
}
