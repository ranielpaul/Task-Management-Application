# Task Management Application

This repository is a barebones framework for a task management application. The current goal is to document the planned structure before adding real functionality.

The frontend renders a simple dashboard shell with empty design cards and a task table layout. API calls, hooks, backend routes, state handling, and CRUD behavior are intentionally left as comments and placeholder exports.

## Project Structure

```text
Task-Management-Application/
|-- Backend/
|   `-- main.py
|-- Frontend/
|   |-- public/
|   |   |-- favicon.svg
|   |   `-- icons.svg
|   |-- src/
|   |   |-- api/
|   |   |   |-- Axios.js
|   |   |   `-- TaskAPI.js
|   |   |-- hooks/
|   |   |   `-- useTasks.js
|   |   |-- pages/
|   |   |   `-- home/
|   |   |       |-- Index.jsx
|   |   |       `-- components/
|   |   |           |-- Header.jsx
|   |   |           |-- TaskActions.jsx
|   |   |           |-- TaskForm.jsx
|   |   |           |-- TaskRow.jsx
|   |   |           `-- TaskTable.jsx
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
`-- readme.md
```

## Backend

- `Backend/main.py` is reserved for the backend application entry point.
- Future backend work should define the API server, task routes, request validation, and database connection here or import them from dedicated backend modules.
- No backend functionality has been implemented yet.

## Frontend

- `Frontend/index.html` contains the root HTML document used by Vite.
- `Frontend/vite.config.js` configures the React and Tailwind build setup.
- `Frontend/src/main.jsx` mounts the React app into the HTML root element.
- `Frontend/src/App.jsx` provides the application-level page wrapper.
- `Frontend/src/index.css` imports Tailwind and is the future place for global styling.

## Frontend Folders

- `src/api/` should contain client-side API utilities.
- `src/api/Axios.js` should eventually export the configured Axios client, including the base API URL and shared request settings.
- `src/api/TaskAPI.js` should eventually export task-specific API functions such as create, read, update, delete, search, and filter requests.
- `src/hooks/` should contain reusable React hooks.
- `src/hooks/useTasks.js` should eventually hold task state, loading/error state, and functions that connect UI components to the task API.
- `src/pages/` should contain route-level page folders.
- `src/pages/home/Index.jsx` is the home dashboard page where the header, task actions, and task table are composed.
- `src/pages/home/components/` should contain components that belong only to the home dashboard.

## Home Components

- `Header.jsx` is reserved for the page title area, add-task entry point, search input, and filter controls.
- `TaskForm.jsx` is reserved for add and edit task form placeholders.
- `TaskTable.jsx` contains the current task table structure and should later receive task data from `useTasks`.
- `TaskRow.jsx` is reserved for rendering one task per table row.
- `TaskActions.jsx` is reserved for row-level edit, complete/incomplete, and delete buttons.

## Planned Features

- Add a task.
- Mark a task as complete or incomplete.
- Edit task details such as title, description, due date, priority, and category.
- Delete a task.
- Search tasks by title, category, or description.
- Filter tasks by all, active, inactive, and completed status.
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
