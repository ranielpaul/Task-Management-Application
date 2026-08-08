# Task Implementation Steps

1. [x] Create `Frontend/src/api/fakedata.js` with sample tasks.
2. [x] Implement Axios client in `Frontend/src/api/Axios.js`.
3. [x] Implement `taskApi` functions in `Frontend/src/api/TaskAPI.js` against fake data.
4. [x] Wire `useTasks` hook to TaskAPI with loading/error states.
5. [x] Add loading/empty states to `TaskTable.jsx`.
6. [x] Pass `loading`/`error` from `useTasks` to `TaskTable` in `Index.jsx`.
7. [x] Verify with `npm run build` (frontend builds cleanly).
8. [x] Switch `TaskAPI.js` to the real backend API (FastAPI + PostgreSQL).
9. [x] Fix backend UUID response validation bug in `Backend/schemas.py`.
10. [x] Verify full CRUD flow against the running backend.
</content>
