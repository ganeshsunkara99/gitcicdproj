function toItem(item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
  };
}

function toItemList(items) {
  return items.map(toItem);
}

module.exports = { toItem, toItemList };
