const express = require("express");
const itemRoutes = require("./routes/itemRoutes");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (request, response) => {
    response.type("text").send("Hello from the sample Express REST API!\n");
  });

  app.get("/health", (request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/items", itemRoutes);

  app.use((request, response) => {
    response.status(404).json({ error: "Not found" });
  });

  app.use((error, request, response, next) => {
    if (error.type === "entity.parse.failed") {
      response.status(400).json({ error: "Invalid JSON" });
      return;
    }

    next(error);
  });

  return app;
}

module.exports = { createApp };
