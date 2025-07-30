/**
 * This is configuration for API documentation using Swagger.
 * It defines the API's metadata, security schemes, and server URLs.
 */
const documentationOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Gizmos Backend API",
      version: "1.0.0",
      description:
        "The complete API documentation for the Gizmos application backend.",
      contact: {
        name: "Satyam Sovan Mishra",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {},
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000/api/v1/",
        description: "Development server",
      },
      {
        url: "https://gizmos-backend.onrender.com/api/v1/",
        description: "Production server",
      },
    ],
  },
  apis: ["./models/*.js", "./routes/*.js"],
};

export { documentationOptions };
