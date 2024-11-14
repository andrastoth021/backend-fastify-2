import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { getPetByIdSchema, getPetsSchema, postPetsSchema, putPetsToOwnersSchema } from './pet.schemas';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';
import { getOwnerByIdSchema, getOwnersSchema, postOwnerSchema } from './owner.schemas';
import { createPetRoute } from './routes/pet.routes';
import { createOwnerRoute } from './routes/owner.routes';

type Dependencies = {
  dbClient: DbClient;
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);
  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);

  const app = fastify(options)

  app.register(createPetRoute, { petService });
  app.register(createOwnerRoute, { petService, ownerService });

  return app;
}