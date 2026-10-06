# ADR-001: Backend Framework Selection

## Status

Accepted

## Date

October 6, 2026

## Context

The Registrar Management System requires a backend API that can be
used by the frontend during the integration phase.

The current requirement is to provide a working API with mock data.
A database is not required at this stage.

The backend must provide:

- REST API endpoints
- JSON responses
- OpenAPI documentation
- Swagger UI
- API versioning
- Error handling
- Layered architecture

## Decision

We chose Node.js with Express.js as the backend framework.

The backend follows this architecture:

routes → services → data

The data layer uses JavaScript arrays as mock data.

No database is used in the current prototype.

## Reasons

Express.js was selected because:

1. It is lightweight.
2. It is easy to understand.
3. The team is familiar with JavaScript.
4. It is suitable for REST API development.
5. It supports middleware.
6. It works well with OpenAPI and Swagger UI.
7. It allows the frontend to test the API before a database is required.

## Consequences

### Positive

- No database installation is required.
- The API can run immediately.
- Swagger UI can test the endpoints.
- Mock data is easy to modify.
- The frontend can integrate with the API.

### Negative

- Data is not permanently saved.
- Data resets when the server restarts.
- The current API is intended for prototype and integration testing.

## Future Consideration

If persistent storage is required in the future, the data layer can be
replaced with PostgreSQL or another database without changing the
overall routes → services → data architecture.