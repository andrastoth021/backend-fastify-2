import { PetToCreate } from "../entity/pet.type";
import { PetRepository } from "../repository/pet.repository"

export class PetService {
  private readonly repository;

  constructor(repository: PetRepository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.read();
  }

  async getById(id: number) {
    const pet = await this.repository.readById(id);
    if(!pet) {
      throw new Error('Pet not found');
    }
    return pet;
  }

  async create(pet: PetToCreate) {
    return await this.repository.create(pet);
  }

  async adopt(petId: number, ownerId: number) {
    const pet = await this.repository.readById(petId);
    if (!pet) {
      throw new Error('Pet does not exists.');
    }
    if(pet.ownerId !== null) {
      throw new Error('Pet has already have an owner.')
    }
    const adopted = await this.repository.update(petId, { ownerId })
    if (!adopted) {
      throw new Error('Pet could not be adopted, because it is disappeared.');
    }
    return adopted;
  }
}