export type Pet = {
  id: number,
  kind: 'dog' | 'cat' | 'reptile' | 'insect'
  name: string,
  age: number,
  weightInKg: number,
  ownerId: number | null,
};

export type PetToCreate = Omit<Pet, 'id' | 'ownerId'>;

export type PetToUpdate = Partial<Omit<Pet, 'id'>>;
