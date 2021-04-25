
export interface FindBusinessOwnerByIdRepository {
  findById: (id: string) => FindBusinessOwnerByIdRepository.Result
}

export namespace FindBusinessOwnerByIdRepository {
  export type Result = Promise<{id: string} | null>
}
