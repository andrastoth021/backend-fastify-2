import { FastifyPluginAsync } from "fastify"
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts"
import { putPetsToOwnersSchema } from "../pet.schemas"
import { getOwnerByIdSchema, getOwnersSchema, postOwnerSchema } from "../owner.schemas"

export const createOwnerRoutes: FastifyPluginAsync = async (app) => {
  // Add Type Provider
  const appWithTypeProvider = app.withTypeProvider<JsonSchemaToTsProvider>();

  appWithTypeProvider.put(
    '/api/owners/:ownerId/pets/:petId',
    { schema: putPetsToOwnersSchema },
    async (request) => {
      const { petId, ownerId } = request.params;
      const updated = await appWithTypeProvider.petService.adopt(petId, ownerId);
      return updated;
    }
  )

  appWithTypeProvider.get(
    '/api/owners',
    { schema: getOwnersSchema },
    async () => {
      return await appWithTypeProvider.ownerService.getAll();
    }
  )

  appWithTypeProvider.get(
    '/api/owners/:id',
    { schema: getOwnerByIdSchema },
    async (request) => {
      const { id } = request.params;
      return await appWithTypeProvider.ownerService.getById(id);
    }
  )

  appWithTypeProvider.post(
    '/api/owners',
    { schema: postOwnerSchema },
    async (request, reply) => {
      const ownerProps = request.body;
      const created = await appWithTypeProvider.ownerService.create(ownerProps);
      reply.status(201);
      return created;
    }
  )
}