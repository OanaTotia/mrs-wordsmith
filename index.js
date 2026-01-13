import { accountRouter } from "./src/api/account.routes.js";
import { swaggerSpec } from "./swagger.ts";
import swaggerUi from "swagger-ui-express";
import express from "express";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", accountRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
