# Task Management Application

This repository is for a fullstack task management application.

## Stack Involved

- Frontend: React, Vite, and Tailwind CSS.
- Backend: FastAPI with Python.
- Database: PostgreSQL.
- API client: Axios.


## Backend

- `Backend/main.py` is reserved for the backend application entry point.
- Future backend work should define the FastAPI server, task routes, request validation, and PostgreSQL database connection here or import them from dedicated backend modules.
- No backend functionality has been implemented yet.

## Frontend 

- `src/api/` should contain client-side API utilities.
- `src/api/Axios.js` should eventually export the configured Axios client, including the base API URL and shared request settings.
- `src/api/TaskAPI.js` should eventually export only the required task API functions: create, read, update, delete, search by name, and filter by status.
- `src/hooks/` should contain reusable React hooks.
- `src/hooks/useTasks.js` should eventually hold task state, loading/error state, and functions that connect UI components to the task API.
- `src/pages/` should contain route-level page folders.
- `src/pages/home/Index.jsx` is the home dashboard page where the header, task actions, and task table are composed.
- `src/pages/home/components/` should contain components that belong only to the home dashboard.

## Home Components

- `Header.jsx` is reserved for the page title area, task name search input, and a button-triggered status filter dropdown with All, Active, Inactive, and Completed options.
- `TaskForm.jsx` is reserved for add and edit task form placeholders using only task title and description fields.
- `TaskTable.jsx` contains the current task table structure and should later receive task data from `useTasks`.
- `TaskRow.jsx` is reserved for rendering one task per table row.
- `TaskActions.jsx` is reserved for row-level edit, complete/incomplete, and delete buttons.
- `Index.jsx` wires placeholder hook values and handlers into the home components through props.

## Required Features

- Add a task.
- Mark a task as complete or incomplete.
- Edit task details such as task title and description.
- Delete a task.
- Search tasks by name.
- Filter tasks by All, Active, Inactive, and Completed status.
- Combine search and filter behavior.

## Design Notes

The frontend should stay simple and dashboard-focused:

- Page background: `gray-100`
- Primary actions: `teal-600`
- Secondary actions: `sky-600`
- Main text: `gray-700` or darker
- Supporting text: `gray-500`
- Cards: white background, light gray border, subtle shadow, compact spacing

## Installation

Install frontend dependencies:

```bash
cd Frontend
npm install
```

Backend dependency setup has not been defined yet.

## Running The Project

Start the frontend:

```bash
cd Frontend
npm run dev
```

Start the backend after backend dependencies and routes are added:

```bash
cd Backend
.\venv\Scripts\activate
uvicorn main:app
```

## Current Status

This is a planning scaffold. The app should remain barebones until the API, hook logic, backend routes, and real task data are intentionally implemented.
