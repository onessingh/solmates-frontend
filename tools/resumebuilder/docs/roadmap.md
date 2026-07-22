# Roadmap

## Phase 0: Baseline Stabilization (Now)
- Normalize resume data model and validation rules.
- Make resume preview the single source of truth.
- Implement deterministic resume scoring.
- Implement deterministic JD pipeline with explainable outputs.
- Replace all placeholders in docs and tests.

## Phase 1: Production MVP
- Authentication: register, login, profile, session validation.
- Resume CRUD with versioning support.
- Template catalog with ATS-safe defaults.
- Export to A4 PDF with pixel-accurate match to preview.
- Print styles: black and white, resume-only output.
- Audit logging for resume exports.

## Phase 2: Quality & Trust
- ATS compliance checklist built into validator.
- Resume linting with actionable fixes.
- JD gap analysis with traceable keyword sources.
- Structured analytics dashboard.
- Accessibility audit and fixes.

## Phase 3: Scale & Collaboration
- Team accounts and shared templates.
- Multi-resume management with history.
- Review workflow and comments.
- Export bundles for recruiters (PDF + ATS TXT).

## Phase 4: Enterprise Readiness
- SSO and enterprise auth providers.
- Custom branding and template packs.
- Compliance reports and audit trails.
- Dedicated analytics pipelines.

## Release Criteria
- No placeholder logic.
- All tests passing.
- Manual verification for export, print, JD evaluation, and template switching.
- Security checks: input validation and auth enforcement.
