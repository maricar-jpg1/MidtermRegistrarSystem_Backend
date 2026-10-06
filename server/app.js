const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const app = express();

const PORT = 5000;

app.use(cors());

app.use(express.json());

const openapiPath = path.join(
  __dirname,
  "openapi.yaml"
);

const openapiDocument = YAML.parse(
  fs.readFileSync(openapiPath, "utf8")
);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument)
);

app.use(
  "/api/v1/health",
  require("./routes/health")
);

app.use(
  "/api/v1/students",
  require("./routes/students")
);

app.use(
  "/api/v1/faculty",
  require("./routes/faculty")
);

app.use(
  "/api/v1/subjects",
  require("./routes/subjects")
);

app.use(
  "/api/v1/enrollments",
  require("./routes/enrollments")
);

app.use(
  "/api/v1/grades",
  require("./routes/grades")
);

app.use(
  "/api/v1/schedules",
  require("./routes/schedules")
);

app.use((req, res) => {
  res
    .status(404)
    .type("application/problem+json")
    .json({
      type: "about:blank",
      title: "Not Found",
      status: 404,
      detail: "The requested endpoint does not exist."
    });
});

app.use((err, req, res, next) => {
  console.error(err);

  res
    .status(500)
    .type("application/problem+json")
    .json({
      type: "about:blank",
      title: "Internal Server Error",
      status: 500,
      detail: "An unexpected server error occurred."
    });
});

app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log(" Registrar Mock API");
  console.log("========================================");
  console.log(`API:     http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/docs`);
  console.log(`Health:  http://localhost:${PORT}/api/v1/health`);
  console.log("========================================");
});