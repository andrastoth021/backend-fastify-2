import { DbClient } from "../db";
import { Pet, PetToCreate, PetToUpdate } from "../entity/pet.type";
import { ident, literal } from "pg-format";

type PetRecord = {
  id: number,
  name: string,
  age: number,
  kind: 'dog' | 'cat' | 'reptile' | 'insect',
  weight_in_kg: string,
  owner_id: number | null,
}

export class PetRepository {
  private readonly client;

  constructor(dbClient: DbClient) {
    this.client = dbClient
  }

  private toEntity(record: PetRecord): Pet {
    const { id, name, age, kind, weight_in_kg, owner_id } = record;
    return {
      id,
      name,
      age,
      kind,
      weightInKg: parseFloat(weight_in_kg),
      ownerId: owner_id
    }
  }

  async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
    const sql = 'SELECT id, name, age, weight_in_kg, kind, owner_id FROM pet LIMIT $1 OFFSET $2;'
    const rows = await this.client.query(sql, [limit, offset]) as Array<PetRecord>;
    return rows.map(this.toEntity)
  }

  async readById(id: number) {
    const sql = 'SELECT id, name, age, weight_in_kg, kind, owner_id FROM pet WHERE id=$1;'
    const rows = await this.client.query(sql, [id]) as Array<PetRecord>;
    return rows.length === 1 ? this.toEntity(rows[0]) : null;
  }

  async create(pet: PetToCreate) {
    const { name, age, weightInKg, kind } = pet;
    const sql = `
      INSERT INTO pet (name, age, weight_in_kg, kind) VALUES 
        ($1, $2, $3, $4) 
      RETURNING *
    `
    const rows = await this.client.query(sql, [name, age, weightInKg, kind]) as Array<PetRecord>
    return rows.map(this.toEntity)[0]
  }

  async countByOwnerId(ownerId: number) {
    const sql = `
      SELECT count(*) as count
      FROM pet
      WHERE owner_id=$1      
    `
    const rows = await this.client.query(sql, [ownerId]) as Array<{count: number}>
    return rows[0].count;
  }

  async update(id: number, updates: PetToUpdate) {
    const entries = Object.entries(updates)
    const sets = entries.map(([key, value]) => {
      if (['name', 'age', 'kind'].includes(key)) {
        return `${ident(key)}=${literal(value)}`
      } else if (key === 'weightInKg') {
        return `weight_in_kg=${literal(value)}`
      } else if (key === 'ownerId') {
        return `owner_id=${literal(value)}`
      }
    });
    const setsExpression = sets
      .filter(set => set !== undefined)
      .join(', ');
    const sql = `
      UPDATE pet 
      SET ${setsExpression} 
      WHERE id=$1
      RETURNING *
    `
    const rows = await this.client.query(sql, [id]) as Array<PetRecord>;
    return rows.length > 0 
      ? this.toEntity(rows[0])
      : null;
  }
}