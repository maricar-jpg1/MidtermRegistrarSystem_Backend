const faculty = require("../data/faculty");

function getAll() {
  return faculty;
}

function getById(id) {
  return faculty.find((item) => item.id === Number(id));
}

function create(data) {
  const nextId =
    faculty.length > 0
      ? Math.max(...faculty.map((item) => item.id)) + 1
      : 1;

  const item = {
    id: nextId,
    ...data
  };

  faculty.push(item);

  return item;
}

function update(id, data) {
  const index = faculty.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  faculty[index] = {
    ...faculty[index],
    ...data,
    id: Number(id)
  };

  return faculty[index];
}

function remove(id) {
  const index = faculty.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  return faculty.splice(index, 1)[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};