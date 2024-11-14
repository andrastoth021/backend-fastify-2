# Tasks

## Prepare the project

Use your favorite Postgres DB, a container option is available in this repo too (`docker compose up -d`). 

Import the `pets.sql` scheme and data into the database.

Modify the connection string in the `./src/db.ts`, and start the dev server (`npm run dev`).

You can try out the `GET /api/pets`, `POST /api/pets` endpoints.

