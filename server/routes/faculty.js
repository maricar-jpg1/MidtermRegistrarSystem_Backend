const express = require("express");
const router = express.Router();

const service = require("../services/facultyService");

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
      "Faculty Not Found",
      "The requested faculty member does not exist."
    );
  }

  res.json({ data: item });
});

router.post("/", (req, res) => {
  const {
    faculty_id,
    first_name,
    last_name,
    department
  } = req.body;

  if (
    !faculty_id ||
    !first_name ||
    !last_name ||
    !department
  ) {
    return problem(
      res,
      400,
      "Bad Request",
      "faculty_id, first_name, last_name, and department are required."
    );
  }

  const item = service.create({
    ...req.body,
    status: req.body.status || "Active"
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
      "Faculty Not Found",
      "The requested faculty member does not exist."
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
      "Faculty Not Found",
      "The requested faculty member does not exist."
    );
  }

  res.json({ data: item });
});

module.exports = router;