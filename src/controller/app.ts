import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { getPetByIdSchema, getPetsSchema, postPetsSchema, putPetsToOwnersSchema } from './pet.schemas';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';
import { getOwnerByIdSchema, getOwnersSchema, postOwnerSchema } from './owner.schemas';

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
    .withTypeProvider<JsonSchemaToTsProvider>()

  app.get(
    '/api/pets',
    { schema: getPetsSchema },
    async () => {
      const pets = await petService.getAll();
      return pets;
    })

  app.get(
    '/api/pets/:id',
    { schema: getPetByIdSchema },
    async (request) => {
      const { id } = request.params;
      const pets = await petService.getById(id);
      return pets;
    })


  app.post(
    '/api/pets',
    { schema: postPetsSchema },
    async (request, reply) => {
      const { body: petToCreate } = request;

      const created = await petService.create(petToCreate);
      reply.status(201);
      return created;
    })

  app.put(
    '/api/owners/:ownerId/pets/:petId',
    { schema: putPetsToOwnersSchema },
    async (request) => {
      const { petId, ownerId } = request.params;
      const updated = await petService.adopt(petId, ownerId);
      return updated;
    }
  )

  app.get(
    '/api/owners',
    { schema: getOwnersSchema },
    async () => {
      return await ownerService.getAll();
    }
  )

  app.get(
    '/api/owners/:id',
    { schema: getOwnerByIdSchema },
    async (request) => {
      const { id } = request.params;
      return await ownerService.getById(id);
    }
  )

  app.post(
    '/api/owners',
    { schema: postOwnerSchema },
    async (request, reply) => {
      const ownerProps = request.body;
      const created = await ownerService.create(ownerProps);
      reply.status(201);
      return created;
    }
  )

  return app;
}