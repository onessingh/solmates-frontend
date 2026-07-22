# API

Base URL: `/api/v1`
All responses are JSON.
All write endpoints require `Authorization: Bearer <token>` unless noted.

## Auth

### POST /auth/register
Create a user account.

Request:
```
{
  "full_name": "Jordan Rivera",
  "email": "jordan@email.com",
  "password": "StrongPassword123!",
  "provider": "local"
}
```

Response:
```
{
  "user": {
    "id": "uuid",
    "full_name": "Jordan Rivera",
    "email": "jordan@email.com",
    "provider": "local",
    "is_premium": false,
    "created_at": "iso",
    "updated_at": "iso"
  }
}
```

### POST /auth/login
Authenticate and return token.

Request:
```
{ "email": "jordan@email.com", "password": "StrongPassword123!" }
```

Response:
```
{
  "token": "jwt",
  "user": { "id": "uuid", "full_name": "...", "email": "...", "provider": "local", "is_premium": false }
}
```

### GET /auth/me
Get current user profile.

Response:
```
{ "user": { "id": "uuid", "full_name": "...", "email": "...", "provider": "local", "is_premium": false } }
```

### PUT /auth/me
Update current user profile.

Request:
```
{ "full_name": "New Name", "is_premium": true }
```

Response:
```
{ "user": { "id": "uuid", "full_name": "New Name", "email": "...", "provider": "local", "is_premium": true } }
```

### POST /auth/logout
Invalidate the current session.

Response:
```
{ "success": true }
```

## Resumes

### POST /resumes
Create a resume.

Request:
```
{ "user_id": "uuid", "title": "Product Designer Resume", "selected_template": "ats" }
```

Response:
```
{ "resume": { "id": "uuid", "user_id": "uuid", "title": "...", "selected_template": "ats", "resume_score": 0, "is_active": true } }
```

### GET /resumes
List resumes, optionally filtered by `user_id`.

Response:
```
{ "resumes": [ { "id": "uuid", "title": "...", "selected_template": "ats" } ] }
```

### GET /resumes/:id
Fetch a resume by id.

Response:
```
{ "resume": { "id": "uuid", "title": "...", "selected_template": "ats" } }
```

### PUT /resumes/:id
Update a resume.

Request:
```
{
  "title": "Updated Resume",
  "selected_template": "modern",
  "personal_info": { "full_name": "Jordan Rivera", "email": "jordan@email.com" },
  "summary": "Summary text",
  "experience": [],
  "education": [],
  "skills": [],
  "certifications": [],
  "languages": []
}
```

Response:
```
{ "resume": { "id": "uuid", "title": "Updated Resume", "selected_template": "modern" } }
```

### DELETE /resumes/:id
Delete a resume.

Response:
```
{ "success": true }
```

### PATCH /resumes/:id/active
Set resume active flag.

Request:
```
{ "is_active": true }
```

Response:
```
{ "resume": { "id": "uuid", "is_active": true } }
```

### POST /resumes/:id/score
Recalculate resume score.

Response:
```
{ "resume_score": 86 }
```

## Analytics

### POST /analytics
Create analytics event.

Request:
```
{ "resume_id": "uuid", "event_type": "export_pdf", "metadata": { "template": "ats" } }
```

Response:
```
{ "event": { "id": "uuid", "resume_id": "uuid", "event_type": "export_pdf", "metadata": {} } }
```

### GET /analytics
List analytics events. Optional `resume_id`.

Response:
```
{ "events": [ { "id": "uuid", "resume_id": "uuid", "event_type": "export_pdf" } ] }
```

### GET /analytics/summary
Get event counts.

Response:
```
{ "counts": { "export_pdf": 12 }, "total": 12 }
```
