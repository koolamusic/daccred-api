import * as oa from 'openapi3-ts';
import config from './config';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { defaultMetadataStorage } from 'class-transformer/storage';
import { customerPolicy, employeePolicy, subscriberPolicy, superadminPolicy } from '../app/shared/iam';

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
  classTransformerMetadataStorage: defaultMetadataStorage,
});

export const swaggerSpecOptions: Partial<oa.OpenAPIObject> = {
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        flows: {
          implicit: {
            authorizationUrl: 'http://services.dev.worldtreeconsulting.com:8080',
            scopes: {
              ...customerPolicy.rules,
              ...subscriberPolicy.rules,
              ...superadminPolicy.rules,
              ...employeePolicy.rules,
            },
          },
        },
      },
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
    },
    {
      url: 'http://services.dev.worldtreeconsulting.com:8080',
    },
  ],
  info: {
    description: `API Documentation for the ${config.serviceName}`,
    title: `${config.serviceName} API`,
    version: '1.0.0',
  },
  paths: {
    '/_healthcheck': {
      get: {
        tags: ['Test'],
        summary: 'Get Test',
        description: 'Returns a list of Test',
        operationId: 'healthcheck',
        responses: {
          '200': {
            description: 'successful operation',
          },
          '404': {
            description: 'No Test found',
            content: {},
          },
        },
      },
    },
    '/docs': {
      get: {
        tags: ['Test'],
        summary: 'Get Documentation',
        description: 'Returns the API Documentation',
        operationId: 'healthcheck',
        responses: {
          '200': {
            description: 'successful operation',
          },
          '404': {
            description: 'No Docs found',
            content: {},
          },
        },
      },
    },
  },
};
