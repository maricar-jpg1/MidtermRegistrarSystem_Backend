const express = require("express");
const router = express.Router();

const service = require("../services/studentService");

function problem(res, status, title, detail) {
  return res
    .status(status)
    .type("application/problem+json")
    .json({
      type: "about:blank",
      title,
      status,
      detail
    });
}

router.get("/", (req, res) => {
  res.json({
    data: service.getAll()
  });
});

router.get("/:id", (req, res) => {
  const student = service.getById(req.params.id);

  if (!student) {
    return problem(
      res,
      404,
      "Student Not Found",
      "The requested student does not exist."
    );
  }

  res.json({
    data: student
  });
});

router.post("/", (req, res) => {
  const {
    student_id,
    first_name,
    last_name,
    program
  } = req.body;

  if (
    !student_id ||
    !first_name ||
    !last_name ||
    !program
  ) {
    return problem(
      res,
      400,
      "Bad Request",
      "student_id, first_name, last_name, and program are required."
    );
  }

  const student = service.create({
    student_id,
    first_name,
    last_name,
    email: req.body.email || "",
    program,
    year_level: req.body.year_level || 1,
    status: req.body.status || "Active"
  });

  res.status(201).json({
    data: student
  });
});

router.put("/:id", (req, res) => {
  const student = service.update(
    req.params.id,
    req.body
  );

  if (!student) {
    return problem(
      res,
      404,
      "Student Not Found",
      "The requested student does not exist."
    );
  }

  res.json({
    data: student
  });
});

router.delete("/:id", (req, res) => {
  const student = service.remove(req.params.id);

  if (!student) {
    return problem(
      res,
      404,
      "Student Not Found",
      "The requested student does not exist."
    );
  }

  res.json({
    data: student
  });
});

module.exports = router;