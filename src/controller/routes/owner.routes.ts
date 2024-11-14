import { FastifyPluginAsync } from "fastify"
import { OwnerService } from "../../service/owner.service"
import { PetService } from "../../service/pet.service"
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts"
import { putPetsToOwnersSchema } from "../pet.schemas"
import { getOwnerByIdSchema, getOwnersSchema, postOwnerSchema } from "../owner.schemas"

interface PluginOptions {
  petService: PetService,
  ownerService: OwnerService
}

export const createOwnerRoutes: FastifyPluginAsync<PluginOptions> = async (app, { petService, ownerService }
) => {
  // Add Type Provider
  const appWithTypeProvider = app.withTypeProvider<JsonSchemaToTsProvider>();

  appWithTypeProvider.put(
    '/api/owners/:ownerId/pets/:petId',
    { schema: putPetsToOwnersSchema },
    async (request) => {
      const { petId, ownerId } = request.params;
      const updated = await petService.adopt(petId, ownerId);
      return updated;
    }
  )

  appWithTypeProvider.get(
    '/api/owners',
    { schema: getOwnersSchema },
    async () => {
      return await ownerService.getAll();
    }
  )

  appWithTypeProvider.get(
    '/api/owners/:id',
    { schema: getOwnerByIdSchema },
    async (request) => {
      const { id } = request.params;
      return await ownerService.getById(id);
    }
  )

  appWithTypeProvider.post(
    '/api/owners',
    { schema: postOwnerSchema },
    async (request, reply) => {
      const ownerProps = request.body;
      const created = await ownerService.create(ownerProps);
      reply.status(201);
      return created;
    }
  )
}