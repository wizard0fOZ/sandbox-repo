# File Structure

```text
backend-engagement-engine/
|-- prisma/
|   |-- schema.prisma                 # Prisma database schema, models, enums, relationships
|   |-- seed.js                       # Seed script for demo dataset
|   `-- migrations/                   # Auto-generated migration files
|
|-- src/
|   |-- app.js                        # Express app setup, middleware, routes registration
|   |-- server.js                     # Entry point, starts server using process.env.PORT
|   |
|   |-- config/
|   |   |-- db.js                     # Prisma client instance
|   |   |-- env.js                    # Environment variable loading and validation
|   |   |-- cors.js                   # CORS configuration for local and Azure frontend
|   |   `-- storage.js                # Azure Blob Storage client configuration
|   |
|   |-- middleware/
|   |   |-- auth.js                   # JWT authentication middleware
|   |   |-- role.js                   # Role-based access control middleware
|   |   |-- validate.js               # Zod request validation middleware
|   |   |-- upload.js                 # Multer upload middleware
|   |   `-- errorHandler.js           # Global error handling middleware
|   |
|   |-- modules/
|   |   |
|   |   |-- health/                   # System health and setup checks
|   |   |   |-- health.routes.js
|   |   |   `-- health.controller.js
|   |   |
|   |   |-- auth/                     # Authentication and user login
|   |   |   |-- auth.routes.js
|   |   |   |-- auth.controller.js
|   |   |   |-- auth.service.js
|   |   |   |-- auth.repository.js
|   |   |   `-- auth.schema.js
|   |   |
|   |   |-- uploads/                  # Azure Blob Storage uploads
|   |   |   |-- upload.routes.js
|   |   |   |-- upload.controller.js
|   |   |   |-- upload.service.js
|   |   |   `-- upload.schema.js
|   |   |
|   |   |-- missions/                 # Missions Engine
|   |   |   |-- mission.routes.js
|   |   |   |-- mission.controller.js
|   |   |   |-- mission.service.js
|   |   |   |-- mission.repository.js
|   |   |   `-- mission.schema.js
|   |   |
|   |   |-- submissions/              # Mission submission validation and review
|   |   |   |-- submission.routes.js
|   |   |   |-- submission.controller.js
|   |   |   |-- submission.service.js
|   |   |   |-- submission.repository.js
|   |   |   `-- submission.schema.js
|   |   |
|   |   |-- content/                  # Educational Content Engine
|   |   |   |-- content.routes.js
|   |   |   |-- content.controller.js
|   |   |   |-- content.service.js
|   |   |   |-- content.repository.js
|   |   |   `-- content.schema.js
|   |   |
|   |   |-- quizzes/                  # Quiz bank, scoring, and learning progress
|   |   |   |-- quiz.routes.js
|   |   |   |-- quiz.controller.js
|   |   |   |-- quiz.service.js
|   |   |   |-- quiz.repository.js
|   |   |   `-- quiz.schema.js
|   |   |
|   |   |-- badges/                   # Badges Engine
|   |   |   |-- badge.routes.js
|   |   |   |-- badge.controller.js
|   |   |   |-- badge.service.js
|   |   |   |-- badge.repository.js
|   |   |   `-- badge.schema.js
|   |   |
|   |   `-- points/                   # Points event emitter
|   |       |-- points.routes.js
|   |       |-- points.controller.js
|   |       |-- points.service.js
|   |       `-- points.repository.js
|   |
|   `-- utils/
|       |-- constants.js              # Enums/constants used across modules
|       |-- apiResponse.js            # Standard JSON response formatter
|       |-- asyncHandler.js           # Wrapper for async route handlers
|       `-- generateToken.js          # JWT token helper
|
|-- tests/
|   |-- health.test.js                # Health/setup endpoint tests
|   |-- auth.test.js                  # Auth tests
|   |-- missions.test.js              # Missions Engine tests
|   |-- submissions.test.js           # Submission validation and anti-duplicate tests
|   |-- uploads.test.js               # Blob upload tests
|   |-- content.test.js               # Educational Content Engine tests
|   |-- quizzes.test.js               # Quiz scoring and learning progress tests
|   `-- badges.test.js                # Badge evaluation and idempotent issuance tests
|
|-- docs/
|   |-- api-endpoints.md              # Backend API endpoint list
|   |-- environment-variables.md      # Backend environment variable notes
|   |-- database-schema.md            # Database table explanation
|   `-- testing-plan.md               # Postman/Jest testing flow
|
|-- .env                              # Local environment variables, never commit
|-- .env.example                      # Safe template for required variables
|-- .gitignore                        # Excludes node_modules, .env, logs, build files
|-- package.json                      # Dependencies and npm scripts
|-- package-lock.json
|-- README.md                         # Backend setup guide
`-- Dockerfile                        # Optional, only if container deployment is needed
```
