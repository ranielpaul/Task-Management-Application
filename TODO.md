# Task Implementation Steps

1. [x] Create `Frontend/src/api/fakedata.js` with sample tasks.
2. [x] Implement Axios client in `Frontend/src/api/Axios.js`.
3. [x] Implement `taskApi` functions in `Frontend/src/api/TaskAPI.js` (backend with fake-data fallback).
4. [x] Wire `useTasks` hook to TaskAPI with loading/error states.
5. [x] Add loading/empty states to `TaskTable.jsx`.
6. [x] Pass `loading`/`error` from `useTasks` to `TaskTable` in `Index.jsx`.
7. [x] Search filters only on button press (redone in round 2).
8. [x] Add delete confirmation alert in `TaskActions.jsx`.
9. [x] PostgreSQL + FastAPI backend connected to frontend (fallback to fake data).
   - [x] `Backend/requirements.txt`
   - [x] `Backend/database.py`
   - [x] `Backend/models.py`
   - [x] `Backend/schemas.py`
   - [x] `Backend/main.py`
   - [x] `TaskAPI.js`: call real backend, fall back to fake data.
10. [x] Verify lint + dev server.
