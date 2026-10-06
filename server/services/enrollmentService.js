const enrollments = require("../data/enrollments");

function getAll() {
  return enrollments;
}

function getById(id) {
  return enrollments.find((item) => item.id === Number(id));
}

function create(data) {
  const nextId =
    enrollments.length > 0
      ? Math.max(...enrollments.map((item) => item.id)) + 1
      : 1;

  const item = {
    id: nextId,
    ...data
  };

  enrollments.push(item);

  return item;
}

function update(id, data) {
  const index = enrollments.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  enrollments[index] = {
    ...enrollments[index],
    ...data,
    id: Number(id)
  };

  return enrollments[index];
}

function remove(id) {
  const index = enrollments.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  return enrollments.splice(index, 1)[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};