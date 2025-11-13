import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, type ZodTypeProvider } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyCors } from "@fastify/cors";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { listWebhooks } from "./routes/list-webhooks";
import { env } from "./env";
import { getWebhooks } from "./routes/get-webhooks";
import { deleteWebhooks } from "./routes/delete-webhooks";
import { captureWebhooks } from "./routes/capture-webhooks";
import { generateHandler } from "./routes/generate-handler";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // credentials: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "NeuroHook Inspector API",
      description: "API para captura e inspeção de webhooks",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});


app.register(ScalarApiReference, {
  routePrefix: "/docs" // Documentação do Projeto
})

app.register(listWebhooks);
app.register(getWebhooks);
app.register(deleteWebhooks);
app.register(captureWebhooks);
app.register(generateHandler);

app.listen({ port: env.PORT, host: "0.0.0.0"}).then(() => {
  console.log("🔥 HTTP server running on http://localhost:3333!")
  console.log("📚 Docs available at http://localhost:3333/docs")
})