const itemModel = require("../models/itemModel");
const itemView = require("../views/itemView");

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function validateItem(body) {
  const { name, description = "" } = body ?? {};

  if (typeof name !== "string" || name.trim() === "") {
    return { error: "name is required" };
  }

  if (typeof description !== "string") {
    return { error: "description must be a string" };
  }

  return { name: name.trim(), description };
}

function list(request, response) {
  response.json(itemView.toItemList(itemModel.findAll()));
}

function get(request, response) {
  const id = parseId(request.params.id);
  const item = id === null ? undefined : itemModel.findById(id);

  if (!item) {
    response.status(404).json({ error: "Item not found" });
    return;
  }

  response.json(itemView.toItem(item));
}

function create(request, response) {
  const validated = validateItem(request.body);

  if (validated.error) {
    response.status(400).json({ error: validated.error });
    return;
  }

  const item = itemModel.create(validated);
  response.status(201).json(itemView.toItem(item));
}

function update(request, response) {
  const id = parseId(request.params.id);

  if (id === null || !itemModel.findById(id)) {
    response.status(404).json({ error: "Item not found" });
    return;
  }

  const validated = validateItem(request.body);

  if (validated.error) {
    response.status(400).json({ error: validated.error });
    return;
  }

  response.json(itemView.toItem(itemModel.update(id, validated)));
}

function remove(request, response) {
  const id = parseId(request.params.id);

  if (id === null || !itemModel.remove(id)) {
    response.status(404).json({ error: "Item not found" });
    return;
  }

  response.status(204).end();
}

module.exports = { list, get, create, update, remove };
