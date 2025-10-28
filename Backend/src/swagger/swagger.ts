import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sales Analytics API',
      version: '1.0.0',
      description: 'GraphQL API for Sales Analytics Dashboard',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'GraphQL',
        description: 'GraphQL endpoint for all operations',
      },
      {
        name: 'Health',
        description: 'Health check endpoint for server status',
      },
    ],
    components: {
      schemas: {
        Sale: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            productName: { type: 'string' },
            category: { type: 'string' },
            quantity: { type: 'integer' },
            price: { type: 'number' },
            totalAmount: { type: 'number' },
            saleDate: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'productName', 'category', 'quantity', 'price', 'totalAmount', 'saleDate'],
        },
        CreateSaleInput: {
          type: 'object',
          properties: {
            productName: { type: 'string' },
            category: { type: 'string' },
            quantity: { type: 'integer' },
            price: { type: 'number' },
            saleDate: { type: 'string', format: 'date-time' },
          },
          required: ['productName', 'category', 'quantity', 'price', 'saleDate'],
        },
      },
    },
  },
  apis: ['./src/index.ts', './src/graphql/resolvers.js'], // Include resolver files
};

export const swaggerSpec = swaggerJsdoc(options);