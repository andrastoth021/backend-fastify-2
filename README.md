# HTTP requests and responses

## Setting up the repo

### Install NPM dependencies

- Issue an `npm install` command.
- Rename `.env.example` to `.env` for development and fill the proper values.

## Using the repo

- Start a development server in watch mode: `npm run dev`.
- Run all tests: `npm test`.
- Run a specific test file `npm test -- <file name>`.
- Create a production build (TS -> JS): `npm run build`.
- Start the production build: `npm start`.
- A Postgres DB is provided within a compose file. The `5432` port is exposed to `5400`. You can spin it up with the `docker compose up`.

## Tasks

Check the [tasks.md](./tasks.md) for the details.