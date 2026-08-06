/*
  Example fake data used to populate the app while the backend is not yet set up.

  Each task matches the shape the UI expects:
    {
      id: string,
      title: string,
      description: string,
      status: 'Active' | 'Inactive' | 'Completed',
    }

  Once the FastAPI backend is ready, replace the TaskAPI implementation with
  real HTTP calls and remove this file.
*/

export const fakeTasks = [
  {
    id: '1',
    title: 'Design the dashboard layout',
    description: 'Create wireframes and a color palette for the task dashboard.',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Set up the backend API',
    description: 'Build FastAPI routes, request validation, and a PostgreSQL connection.',
    status: 'Active',
  },
  {
    id: '3',
    title: 'Write API client functions',
    description: 'Implement create, read, update, delete, search, and filter in TaskAPI.',
    status: 'Inactive',
  },
  {
    id: '4',
    title: 'Add task search and filter',
    description: 'Combine name search with status filtering in the home header.',
    status: 'Completed',
  },
  {
    id: '5',
    title: 'Write documentation',
    description: 'Document how to run the frontend and backend locally.',
    status: 'Completed',
  },
  {
    id: '6',
    title: 'Review pull requests',
    description: 'Review and merge pending feature branches for the team.',
    status: 'Inactive',
  },
];

export default fakeTasks;
