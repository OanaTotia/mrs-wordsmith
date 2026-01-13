import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Account Management API",
      version: "1.0.0",
      description: "Simple REST API for managing accounts",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        Account: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            address: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["id", "name", "email", "createdAt"],
        },
      },
    },
  },
  apis: ["./src/api/**/*.ts"], // only scan route files
});
