const express = require("express");
const router = express.Router();

const service = require("../services/enrollmentService");

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
      "Enrollment Not Found",
      "The requested enrollment does not exist."
    );
  }

  res.json({ data: item });
});

router.post("/", (req, res) => {
  const {
    enrollment_id,
    student_id,
    academic_year,
    semester,
    program,
    year_level,
    section
  } = req.body;

  if (
    !enrollment_id ||
    !student_id ||
    !academic_year ||
    !semester ||
    !program ||
    !year_level ||
    !section
  ) {
    return problem(
      res,
      400,
      "Bad Request",
      "Required enrollment fields are missing."
    );
  }

  const item = service.create({
    ...req.body,
    status: req.body.status || "Pending"
  });

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
      "Enrollment Not Found",
      "The requested enrollment does not exist."
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
      "Enrollment Not Found",
      "The requested enrollment does not exist."
    );
  }

  res.json({ data: item });
});

module.exports = router;