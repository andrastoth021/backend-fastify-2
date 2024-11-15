import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';
import { createPetRoutes } from './routes/pet.routes';
import { createOwnerRoutes } from './routes/owner.routes';

type Dependencies = {
  dbClient: DbClient;
}

declare module 'fastify' {
  interface FastifyInstance {
    petService: PetService,
    ownerService: OwnerService
  }
  interface FastifyRequest {
    message: string
  }
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);
  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);

  const app = fastify(options)

  app.decorateRequest('message', 'Hello')

  app.addHook('onRequest', (request, reply, done) => {
    const message = request.message;
    console.log('Message: ' + message);
    done()
  })

  app.addHook('onResponse', (request, reply, done) => {
    const message = request.message;
    console.log('Message: ' + message)
    done()
  })

  app.decorate('petService', petService);
  app.decorate('ownerService', ownerService);

  app.register(createPetRoutes);
  app.register(createOwnerRoutes);
  // app.register(createMessengerPlugin, { message: 'Titkos üzenet száll a szélben' });

  return app;
}