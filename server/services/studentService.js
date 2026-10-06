const students = require("../data/students");

function getAll() {
  return students;
}

function getById(id) {
  return students.find((student) => student.id === Number(id));
}

function create(data) {
  const nextId =
    students.length > 0
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1;

  const student = {
    id: nextId,
    ...data
  };

  students.push(student);

  return student;
}

function update(id, data) {
  const index = students.findIndex(
    (student) => student.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  students[index] = {
    ...students[index],
    ...data,
    id: Number(id)
  };

  return students[index];
}

function remove(id) {
  const index = students.findIndex(
    (student) => student.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  return students.splice(index, 1)[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};