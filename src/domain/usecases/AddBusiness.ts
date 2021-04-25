import { Business } from '@domain/entities'

export interface AddBusiness {
  save: (business: AddBusiness.Params) => Promise<Business>
}

export namespace AddBusiness {
  export interface Params extends Omit<Business, 'id'> {
    user_id: string
  }

  export interface Result extends Business {}
}
