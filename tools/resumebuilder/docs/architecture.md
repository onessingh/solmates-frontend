# Architecture

## Goals
- ATS-safe, deterministic resume rendering and export.
- Clear separation of UI, state, business logic, services, and persistence.
- Single source of truth for resume data and JD evaluation.
- Production-ready security, observability, and deployment.

## System Context
The platform consists of:
- A client web app for building resumes, evaluating JD fit, and exporting.
- A backend API for authentication, persistence, analytics, and export orchestration.
- A PostgreSQL database for durable storage and auditability.

## Frontend Architecture
The frontend is a single-page application (SPA) with the following layers:
- UI: Presentational components only.
- State: Centralized stores for resume, template, auth, and UI.
- Domain: Resume engine and JD pipeline (pure, deterministic).
- Services: API client and feature-specific service modules.

### Key Modules
- `src/resume/*`: Resume engine (parser, validator, renderer, scoring, export).
- `src/ai/*`: JD pipeline (parser, normalizer, matcher, explainable outputs).
- `src/services/*`: HTTP boundary for backend communication.
- `src/store/*`: State containers, no business logic.
- `src/components/*`: UI components, no stateful logic beyond local UI.

### Data Flow (Frontend)
1. User edits form inputs.
2. State updates are validated by `ResumeValidator`.
3. Preview is rendered by `ResumeRenderer`.
4. Scoring is computed by `ResumeScoreEngine`.
5. JD evaluation flows through `JD Parser -> Normalizer -> Matcher -> Outputs`.
6. Exports use the same rendered resume HTML as the preview (single source of truth).

## Backend Architecture
The backend is a stateless REST API:
- Controllers: HTTP parsing, status codes, and response shaping.
- Services: Business logic and validation.
- Models: Database mappings only.
- Middleware: Auth, rate limiting, validation, error handling.

### API Responsibilities
- Auth: registration, login, session validation, profile updates.
- Resume CRUD: create/update/list/rescore.
- Template catalog: list active templates.
- Analytics: event collection and summary reporting.

## Database Architecture
PostgreSQL with UUID primary keys and normalized tables:
- Core: `users`, `resumes`, `personal_info`, `summary`, `experience`, `education`, `skills`.
- Extras: `certifications`, `languages`, `templates`, `cover_letters`, `job_applications`.
- Audit: `analytics`, `ai_logs`.

Constraints:
- All foreign keys enforced.
- Soft deletes for core entities.
- Required indices for user/resume lookups and analytics.

## Resume Engine (Single Source of Truth)
The resume preview HTML is authoritative:
- `ResumeParser` normalizes input into structured resume data.
- `ResumeValidator` enforces required sections and ATS-safe rules.
- `ResumeRenderer` renders the preview HTML.
- `ResumeScoreEngine` computes deterministic scores from resume data.
- `ResumeExportPDF` uses the rendered preview to generate A4 output.
- `ResumeExportDOCX` mirrors preview content and structure.

Export rules:
- A4 size, black-and-white, print-safe.
- No UI elements in export/print.
- File names derived from candidate name.

## JD Intelligence Pipeline (Single Pipeline)
Single deterministic pipeline:
1. JD Parser: section and keyword extraction.
2. Normalizer: token cleanup and canonicalization.
3. Matcher: exact and normalized matches.
4. Outputs: match score, rewrite suggestions, heatmap, rejection simulation, template recommendations.

All outputs must be explainable and traceable to inputs.

## Security
- No hard-coded secrets.
- Environment variables only (`.env` for local, runtime env for prod).
- Auth via signed tokens with expiration.
- Input validation on all endpoints.
- Rate limiting on auth and write routes.

## Observability
- Structured request logging (info, warn, error).
- Analytics events captured server-side.
- Error middleware returns clean public messages; stack traces only in non-prod.

## Deployment
- SPA built and served separately or via CDN.
- API deployed as stateless service.
- Database migrations executed before deploy.
- No runtime dependency on local filesystem.

## Testing
- Unit tests for resume engine and JD pipeline.
- Integration tests for API endpoints.
- Manual verification: export, print, JD evaluation, template switching.
