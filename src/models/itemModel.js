const items = [];
let nextItemId = 1;

function findAll() {
  return [...items];
}

function findById(id) {
  return items.find((item) => item.id === id);
}

function create({ name, description }) {
  const item = { id: nextItemId++, name, description };
  items.push(item);
  return item;
}

function update(id, { name, description }) {
  const item = findById(id);

  if (!item) {
    return undefined;
  }

  item.name = name;
  item.description = description;
  return item;
}

function remove(id) {
  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return false;
  }

  items.splice(itemIndex, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };
