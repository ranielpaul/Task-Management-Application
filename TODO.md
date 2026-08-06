# Task Implementation Steps

## Round 1 — Fake data + API + hook + table
1. [x] Create `Frontend/src/api/fakedata.js` with sample tasks.
2. [x] Implement Axios client in `Frontend/src/api/Axios.js`.
3. [x] Implement `taskApi` functions in `Frontend/src/api/TaskAPI.js` (backend with fake-data fallback).
4. [x] Wire `useTasks` hook to TaskAPI with loading/error states.
5. [x] Add loading/empty states to `TaskTable.jsx`.
6. [x] Pass `loading`/`error` from `useTasks` to `TaskTable` in `Index.jsx`.

## Round 2 — Search button + delete confirmation
7. [x] Search filters only on button press (status filter stays live).
8. [x] Add delete confirmation alert in `TaskActions.jsx`.

## Round 3 — Backend split + modal forms
9. [x] Split `main.py` task routes into `Backend/routers/tasks.py` (APIRouter).
10. [x] Update `Backend/main.py` to include the router.
11. [x] Convert `TaskForm` Add/Edit forms into overlay modals with a blurred, dimmed backdrop.

## Verify
12. [x] Verify lint + dev server.
13. [x] Verify backend files compile (`python -m py_compile`).
