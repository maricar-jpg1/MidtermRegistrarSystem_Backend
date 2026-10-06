const subjects = require("../data/subjects");

function getAll() {
  return subjects;
}

function getById(id) {
  return subjects.find((item) => item.id === Number(id));
}

function create(data) {
  const nextId =
    subjects.length > 0
      ? Math.max(...subjects.map((item) => item.id)) + 1
      : 1;

  const item = {
    id: nextId,
    ...data
  };

  subjects.push(item);

  return item;
}

function update(id, data) {
  const index = subjects.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  subjects[index] = {
    ...subjects[index],
    ...data,
    id: Number(id)
  };

  return subjects[index];
}

function remove(id) {
  const index = subjects.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  return subjects.splice(index, 1)[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};