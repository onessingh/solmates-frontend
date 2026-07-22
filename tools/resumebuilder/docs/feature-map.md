# Feature Map

## Resume Builder
- Form-driven editing for all resume sections.
- Live preview rendered by the resume engine.
- Autosave with deterministic serialization.
- Resume score with clear scoring criteria.
- Template switching with ATS-safe defaults.

## Resume Engine
- Parser: normalize and sanitize inputs.
- Validator: enforce required fields and ATS-safe constraints.
- Renderer: generate preview HTML.
- Score Engine: deterministic scoring.
- Export: A4 PDF output matches preview exactly.

## Job Description Intelligence
- JD parser extracts sections and keywords.
- Normalizer cleans and canonicalizes keywords.
- Matcher scores skill and experience alignment.
- Outputs:
  - Match score
  - Gap analysis (missing and weak matches)
  - Rewrite suggestions (summary/experience/skills)
  - Keyword density heatmap
  - Rejection simulation
  - Template recommendations

## Templates
- Built-in templates: modern, classic, minimal, creative, ATS.
- Each template is a style variant on the same semantic structure.
- ATS templates avoid columns and heavy graphics.

## Export & Print
- Download as PDF only.
- File name derived from resume owner name.
- A4 size and black-and-white output.
- Print-only CSS hides all UI.

## Authentication & Users
- Registration, login, logout.
- Profile read/update.
- Token-based auth with expiration.
- Rate-limited auth routes.

## Persistence
- PostgreSQL schema with normalized tables.
- Resume CRUD with related entities.
- Analytics events for key actions.
- AI logs for JD evaluations.

## Analytics
- Event ingestion endpoint.
- Summary counts per event type.
- Export activity logging.

## Testing
- Unit tests for resume engine and JD pipeline.
- Integration tests for core APIs.
- Manual verification for export, print, and template switching.
