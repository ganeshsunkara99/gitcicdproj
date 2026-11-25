const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const { createServer } = require("./server");

const server = createServer();
let baseUrl;

before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("GET / returns the welcome message", async () => {
  const response = await fetch(`${baseUrl}/`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/plain/);
  assert.equal(await response.text(), "Hello from the sample Express REST API!\n");
});

test("GET /health returns an OK status", async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("items API supports create, read, update, and delete", async () => {
  const listResponse = await fetch(`${baseUrl}/api/items`);
  assert.equal(listResponse.status, 200);
  assert.deepEqual(await listResponse.json(), []);

  const createResponse = await fetch(`${baseUrl}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "  Seed packet  ", description: "Tomatoes" }),
  });
  assert.equal(createResponse.status, 201);
  const createdItem = await createResponse.json();
  assert.deepEqual(createdItem, {
    id: 1,
    name: "Seed packet",
    description: "Tomatoes",
  });

  const readResponse = await fetch(`${baseUrl}/api/items/${createdItem.id}`);
  assert.equal(readResponse.status, 200);
  assert.deepEqual(await readResponse.json(), createdItem);

  const updateResponse = await fetch(`${baseUrl}/api/items/${createdItem.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Flower seeds", description: "Marigolds" }),
  });
  assert.equal(updateResponse.status, 200);
  assert.deepEqual(await updateResponse.json(), {
    id: 1,
    name: "Flower seeds",
    description: "Marigolds",
  });

  const deleteResponse = await fetch(`${baseUrl}/api/items/${createdItem.id}`, {
    method: "DELETE",
  });
  assert.equal(deleteResponse.status, 204);

  const missingResponse = await fetch(`${baseUrl}/api/items/${createdItem.id}`);
  assert.equal(missingResponse.status, 404);
  assert.deepEqual(await missingResponse.json(), { error: "Item not found" });
});

test("invalid item data returns 400", async () => {
  const response = await fetch(`${baseUrl}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: " " }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "name is required" });
});

test("malformed JSON returns 400", async () => {
  const response = await fetch(`${baseUrl}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{invalid",
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Invalid JSON" });
});

test("unknown routes return 404", async () => {
  const response = await fetch(`${baseUrl}/missing`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Not found" });
});
