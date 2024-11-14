
const petBaseProperties = {
  name: { type: 'string' },
  age: { type: 'number', minimum: 0 },
  kind: { enum: ['cat', 'dog', 'reptile', 'insect'] },
  weightInKg: { type: 'number', minimum: 0 }
} as const;

export const petResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    ...petBaseProperties
  }
} as const;

export const postPetsSchema = {
  body: {
    type: 'object',
    properties: {
      ...petBaseProperties
    },
    required: ['name', 'age', 'kind', 'weightInKg'],
    additionalProperties: false
  },
  response: {
    '201': petResponseSchema
  }
} as const;

export const putPetsToOwnersSchema = {
  params: {
    type: 'object',
    properties: {
      ownerId: { type: 'number' },
      petId: { type: 'number' }
    },
    required: ['ownerId', 'petId'],
    additionalProperties: false
  },
  response: {
    '200': petResponseSchema
  }
} as const

export const getPetsSchema = {
  response: {
    '200': {
      type: 'array',
      items: petResponseSchema
    }
  }
} as const

export const getPetByIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: {type: 'number'}
    },
    required: ['id'],
    additionalProperties: false
  },
  response: {
    '200': petResponseSchema
  }
} as const