import { DbClient } from "../db";
import { Owner, OwnerToCreate } from "../entity/owner.type";

type OwnerRecord = {
  id: number,
  name: string,
  age: number,
}

export class OwnerRepository {
  private readonly client;

  constructor(dbClient: DbClient) {
    this.client = dbClient
  }

  private toEntity(record: OwnerRecord): Owner {
    const { id, name, age } = record;
    return {
      id,
      name,
      age,
    }
  }

  async read({ limit, offset }: { limit?: number, offset?: number } = {}) {
    const sql = 'SELECT id, name, age FROM pet_owner LIMIT $1 OFFSET $2;'
    const rows = await this.client.query(sql, [limit, offset]) as Array<OwnerRecord>;
    return rows.map(this.toEntity)
  }

  async readById(id: number) {
    const sql = 'SELECT id, name, age FROM pet_owner WHERE id=$1;'
    const rows = await this.client.query(sql, [id]) as Array<OwnerRecord>;
    return rows.length === 1 ? this.toEntity(rows[0]) : null;
  }

  async create(owner: OwnerToCreate) {
    const {name, age} = owner;
    const sql = `
      INSERT INTO pet_owner (name, age) VALUES 
        ($1, $2) 
      RETURNING *
    `
    const rows  = await this.client.query(sql, [name, age]) as Array<OwnerRecord>
    return rows.map(this.toEntity)[0]
  }
}
