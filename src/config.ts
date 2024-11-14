export type Config = {
  dbConnectionString: string,
  port: number
}

export function validateConfig(): Config {
  const dbConnectionString = process.env.DB_CONNECTION_STRING;
  if (dbConnectionString === undefined) {
    throw new Error('DB_CONNECTION_STRING env variable is not defined');
  }

  const port = Number(process.env.PORT);
  if (isNaN(port)) {
    throw new Error('PORT must be a numeric value');
  }

  return { dbConnectionString, port }
}
