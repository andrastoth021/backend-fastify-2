const ownerBaseProperties = {
  name: { type: 'string' },
  age: { type: 'number' }
} as const;

const ownerResponse = {
  type: 'object',
  properties: {
    ...ownerBaseProperties,
    id: { type: 'number' }
  },
  required: ['id', 'name', 'age'],
  additionalProperties: false
} as const;

export const getOwnersSchema = {
  response: {
    '200': {
      type: 'array',
      items: ownerResponse
    }
  }
} as const;

export const getOwnerByIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: {type: 'number'}
    },
    required: ['id'],
    additionalProperties: false
  },
  response: {
    '200': ownerResponse
  }
} as const;

export const postOwnerSchema = {
  body: {
    type: 'object',
    properties: {
      ...ownerBaseProperties
    },
    required: ['name', 'age'],
  }, 
  response: {
    '201': ownerResponse
  }
} as const