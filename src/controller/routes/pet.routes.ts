import { FastifyPluginAsync } from 'fastify';
import { PetService } from '../../service/pet.service';
import { getPetByIdSchema, getPetsSchema, postPetsSchema } from '../pet.schemas';
import { PetToCreate } from '../../entity/pet.type';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

interface PluginOptions {
  petService: PetService;
}

export const createPetRoute: FastifyPluginAsync<PluginOptions> = async (app,
  { petService }
) => {
  // Adding Type-Provider
  const appWithTypeProvider = app.withTypeProvider<JsonSchemaToTsProvider>()

  // GET api/pets
  app.get(
    '/api/pets',
    { schema: getPetsSchema },
    async () => {
      const pets = await petService.getAll();
      return pets;
    })

  // GET api/pets/id
  appWithTypeProvider.get(
    '/api/pets/:id',
    { schema: getPetByIdSchema },
    async (request) => {
      const { id } = request.params;
      const pets = await petService.getById(id);
      return pets;
    })

  // POST api/pets
  appWithTypeProvider.post(
    '/api/pets',
    { schema: postPetsSchema },
    async (request, reply) => {
      const { body: petToCreate } = request;

      const created = await petService.create(petToCreate);
      reply.status(201);
      return created;
    })
}