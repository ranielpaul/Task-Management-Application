# Task Management Application

A fullstack task management application with a React frontend, a FastAPI backend, and a PostgreSQL database.

## Stack Involved

- Frontend: React, Vite, and Tailwind CSS.
- Backend: FastAPI with Python.
- Database: PostgreSQL.
- API client: Axios.
- ORM: SQLAlchemy 2.0 (with psycopg v3 driver).

---

## Backend (FastAPI)

The backend lives in `Backend/` and is organized as a small package with a `core` module for shared concerns.

- `Backend/main.py` — Application entry point. Creates the FastAPI `app`, registers CORS middleware, wires in the task router, and creates tables on startup (`Base.metadata.create_all`).
- `Backend/routers/tasks.py` — Task REST endpoints under `/api/tasks`:
  - `GET /api/tasks` — list tasks, optionally filtered by `search`, `state`, and/or `status`.
  - `POST /api/tasks` — create a task.
  - `GET /api/tasks/{task_id}` — fetch one task.
  - `PUT /api/tasks/{task_id}` — update title, description, state, and/or status.
  - `PATCH /api/tasks/{task_id}/toggle` — toggle status between Completed and Incomplete.
  - `DELETE /api/tasks/{task_id}` — delete a task.
  - Path params are typed as `UUID` so invalid IDs return a 404 instead of crashing.
- `Backend/core/database.py` — SQLAlchemy `engine`, `SessionLocal`, `Base`, and a `get_db` dependency. Reads `DATABASE_URL` from an env var or `.env` file, defaulting to `postgresql+psycopg://postgres:postgres@localhost:5432/tasksdb`.
- `Backend/core/models.py` — SQLAlchemy ORM models. The `Task` model has `id` (UUID), `title`, `description`, `state` (`Active`/`Inactive`), `status` (`Completed`/`Incomplete`), and `created_at`.
- `Backend/core/schemas.py` — Pydantic request/response schemas (`TaskCreate`, `TaskUpdate`, `TaskRead`) used for validation and serialization.
- `Backend/core/seeder.py` — Seeds the `tasks` table with sample data. Run with `python -m core.seeder` or `python -m core.seeder --reset`.

### Backend setup & running

```bash
cd Backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m core.seeder --reset   # optional: seed sample data
uvicorn main:app --reload
```

> Note: always run Python from within the activated `venv`, otherwise `psycopg` and other dependencies will not be found.

---

## Frontend (React + Vite + Tailwind)

The frontend lives in `Frontend/`.

- `src/api/Axios.js` — Exports the configured Axios client (`apiClient`) with base URL `http://localhost:8000` (overridable via `VITE_API_BASE_URL`).
- `src/api/TaskAPI.js` — Exports `taskApi` with all task functions: fetch (with search/state/status filters), create, update, delete, toggle status, toggle state, search, and filter helpers.
- `src/hooks/useTaskFilters.js` — React hook owning the search and filter UI state (`searchTerm`, `appliedSearchTerm`, `selectedState`, `selectedStatus`) and exposing `searchTasks`, `applySearch`, `filterByState`, `filterByStatus`, plus a derived `filters` object for the API.
- `src/hooks/useTaskCRUD.js` — React hook focused on task data operations: fetches tasks from the backend (given the `filters` object), owns loading/error state and the add/edit modal, and exposes create/update/delete/toggle handlers.
- `src/pages/home/Index.jsx` — Home dashboard page. Composes the Header and TaskTable, wires `useTaskFilters` and `useTaskCRUD` into the components via props.
- `src/pages/home/components/Header.jsx` — Search bar (with a clear/`X` button that resets the search) plus the State and Status filter dropdowns.
- `src/pages/home/components/FilterDropdown.jsx` — Reusable dropdown filter used by the Header for State and Status.
- `src/pages/home/components/TaskTable.jsx` — Renders the task table: Task, Description, State, Status, and Actions columns.
- `src/pages/home/components/TaskRow.jsx` — Renders one task row. State and Status cells are clickable pills that toggle the value.
- `src/pages/home/components/TaskActions.jsx` — Row-level Edit and Delete buttons.
- `src/pages/home/components/TaskForm.jsx` — Add/Edit task modal with title, description, state, and status fields.

### Frontend setup & running

```bash
cd Frontend
npm install
npm run dev
```

---

## Running The Project

Start the backend (from `Backend/`):

```bash
.\venv\Scripts\activate
uvicorn main:app --reload
```

Start the frontend (from `Frontend/`):

```bash
npm run dev
```

The frontend dev server runs on `http://localhost:5173` and calls the API at `http://localhost:8000`. CORS is configured in `Backend/main.py` to allow the Vite dev server origins.
