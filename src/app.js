const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const { EventEmitter } = require("node:events");

function createApp() {
  const app = express();
  const emitter = new EventEmitter();

  emitter.on("orderCreated", (event) =>
    console.log("Listener 1", event.orderId),
  );
  emitter.on("orderCreated", (event) =>
    console.log("Listener 2", event.customerName),
  );
  emitter.on("orderCreated", () => console.log("Listener 3"));

  emitter.emit("orderCreated", { orderId: 123, customerName: "John Doe" });
  emitter.emit("orderCreated", { orderId: 123, customerName: "John Doeee" });

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
