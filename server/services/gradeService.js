const grades = require("../data/grades");

function getAll() {
  return grades;
}

function getById(id) {
  return grades.find((item) => item.id === Number(id));
}

function create(data) {
  const nextId =
    grades.length > 0
      ? Math.max(...grades.map((item) => item.id)) + 1
      : 1;

  const finalGrade =
    (
      Number(data.prelim) +
      Number(data.midterm) +
      Number(data.final)
    ) / 3;

  const item = {
    id: nextId,
    ...data,
    final_grade: Number(finalGrade.toFixed(2)),
    remarks: finalGrade >= 75 ? "Passed" : "Failed"
  };

  grades.push(item);

  return item;
}

function update(id, data) {
  const index = grades.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  const existing = grades[index];

  const prelim =
    data.prelim !== undefined
      ? Number(data.prelim)
      : Number(existing.prelim);

  const midterm =
    data.midterm !== undefined
      ? Number(data.midterm)
      : Number(existing.midterm);

  const final =
    data.final !== undefined
      ? Number(data.final)
      : Number(existing.final);

  const finalGrade = (prelim + midterm + final) / 3;

  grades[index] = {
    ...existing,
    ...data,
    id: Number(id),
    final_grade: Number(finalGrade.toFixed(2)),
    remarks: finalGrade >= 75 ? "Passed" : "Failed"
  };

  return grades[index];
}

function remove(id) {
  const index = grades.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  return grades.splice(index, 1)[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};