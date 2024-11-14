import { FastifyPluginAsync } from 'fastify';
import { getPetByIdSchema, getPetsSchema, postPetsSchema } from '../pet.schemas';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export const createPetRoutes: FastifyPluginAsync = async (app) => {
  // Adding Type-Provider
  const appWithTypeProvider = app.withTypeProvider<JsonSchemaToTsProvider>()

  // GET api/pets
  appWithTypeProvider.get(
    '/api/pets',
    { schema: getPetsSchema },
    async () => {
      const pets = await appWithTypeProvider.petService.getAll();
      return pets;
    })

  // GET api/pets/id
  appWithTypeProvider.get(
    '/api/pets/:id',
    { schema: getPetByIdSchema },
    async (request) => {
      const { id } = request.params;
      const pets = await appWithTypeProvider.petService.getById(id);
      return pets;
    })

  // POST api/pets
  appWithTypeProvider.post(
    '/api/pets',
    { schema: postPetsSchema },
    async (request, reply) => {
      const { body: petToCreate } = request;

      const created = await appWithTypeProvider.petService.create(petToCreate);
      reply.status(201);
      return created;
    })
}