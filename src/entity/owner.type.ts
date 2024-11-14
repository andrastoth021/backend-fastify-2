export type Owner = {
  id: number,
  name: string,
  age: number
}

export type OwnerToCreate = Omit<Owner, 'id'>
