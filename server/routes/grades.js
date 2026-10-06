const express = require("express");
const router = express.Router();

const service = require("../services/gradeService");

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
  const item = service.getById(req.params.id);

  if (!item) {
    return problem(
      res,
      404,
      "Grade Not Found",
      "The requested grade does not exist."
    );
  }

  res.json({ data: item });
});

router.post("/", (req, res) => {
  const {
    student_id,
    subject_id,
    faculty_id,
    prelim,
    midterm,
    final
  } = req.body;

  if (
    !student_id ||
    !subject_id ||
    !faculty_id ||
    prelim === undefined ||
    midterm === undefined ||
    final === undefined
  ) {
    return problem(
      res,
      400,
      "Bad Request",
      "student_id, subject_id, faculty_id, prelim, midterm, and final are required."
    );
  }

  const item = service.create(req.body);

  res.status(201).json({
    data: item
  });
});

router.put("/:id", (req, res) => {
  const item = service.update(
    req.params.id,
    req.body
  );

  if (!item) {
    return problem(
      res,
      404,
      "Grade Not Found",
      "The requested grade does not exist."
    );
  }

  res.json({ data: item });
});

router.delete("/:id", (req, res) => {
  const item = service.remove(req.params.id);

  if (!item) {
    return problem(
      res,
      404,
      "Grade Not Found",
      "The requested grade does not exist."
    );
  }

  res.json({ data: item });
});

module.exports = router;