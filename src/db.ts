import {Pool} from 'pg';

export type DbClient = {
  query: <RowType>(query: string, params?: any[]) => Promise<RowType[] | RowType>;
}

export function createPgClient(connectionString: string): DbClient {
  const pool = new Pool({
    connectionString
  });
  return {
    async query(sql: string, params?: any[]) {
      const result = await pool.query(sql, params);
      return result.rows;
    }

  }
}