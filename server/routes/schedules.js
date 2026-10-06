const express = require("express");
const router = express.Router();

const service = require("../services/scheduleService");

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
      "Schedule Not Found",
      "The requested schedule does not exist."
    );
  }

  res.json({ data: item });
});

router.post("/", (req, res) => {
  const {
    subject_id,
    faculty_id,
    section,
    room,
    day,
    start_time,
    end_time
  } = req.body;

  if (
    !subject_id ||
    !faculty_id ||
    !section ||
    !room ||
    !day ||
    !start_time ||
    !end_time
  ) {
    return problem(
      res,
      400,
      "Bad Request",
      "Required schedule fields are missing."
    );
  }

  if (start_time >= end_time) {
    return problem(
      res,
      400,
      "Bad Request",
      "start_time must be earlier than end_time."
    );
  }

  const item = service.create(req.body);

  if (item.conflict) {
    return problem(
      res,
      400,
      "Schedule Conflict",
      "The schedule conflicts with an existing room, faculty, or section schedule."
    );
  }

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
      "Schedule Not Found",
      "The requested schedule does not exist."
    );
  }

  if (item.conflict) {
    return problem(
      res,
      400,
      "Schedule Conflict",
      "The updated schedule conflicts with an existing schedule."
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
      "Schedule Not Found",
      "The requested schedule does not exist."
    );
  }

  res.json({ data: item });
});

module.exports = router;