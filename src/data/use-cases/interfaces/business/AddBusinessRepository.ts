import { AddBusiness } from '@domain/usecases/AddBusiness'

export interface AddBusinessRepository {
  add: (data: AddBusinessRepository.Params) => Promise<AddBusinessRepository.Result>
}

export namespace AddBusinessRepository {
  export interface Params extends AddBusiness.Params {
    id: string
  }
  export type Result = AddBusiness.Result
}
