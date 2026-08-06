import { apiClient } from './Axios';
import { fakeTasks } from './fakedata';

/*
  Task API.

  Tries to use the real FastAPI backend through apiClient. If the backend is
  not reachable (for example it is not running yet), every function gracefully
  falls back to an in-memory copy of the fake data so the UI still works.

  Once the backend is always available, remove the fallback logic and keep only
  the apiClient calls.

  Expected task shape:
    { id, title, description, status } where status is one of
    'Active' | 'Inactive' | 'Completed'.
*/

// In-memory fallback store seeded with the fake data.
let fallbackStore = [...fakeTasks];

// Tracks whether the fake fallback is active to avoid retrying the backend
// on every call after a single failure.
let usingFallback = false;

const delay = (milliseconds = 200) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// Helper: run an async backend call, falling back to a local operation if the
// backend request fails (e.g. network error because the server is down).
async function withFallback(backendCall, fallbackCall) {
  if (usingFallback) {
    await delay();
    return fallbackCall();
  }

  try {
    const result = await backendCall();
    return result;
  } catch (err) {
    usingFallback = true;
    console.warn('Backend unavailable, using local fake data.', err);
    await delay();
    return fallbackCall();
  }
}

export const taskApi = {
  async fetchTasks() {
    return withFallback(
      async () => {
        const { data } = await apiClient.get('/api/tasks');
        return data;
      },
      () => [...fallbackStore],
    );
  },

  async createTask({ title, description, status = 'Active' }) {
    return withFallback(
      async () => {
        const { data } = await apiClient.post('/api/tasks', {
          title,
          description,
          status,
        });
        return data;
      },
      () => {
        const newTask = {
          id: crypto.randomUUID(),
          title: title.trim(),
          description: (description ?? '').trim(),
          status,
        };
        fallbackStore = [newTask, ...fallbackStore];
        return newTask;
      },
    );
  },

  async updateTask(id, updates) {
    return withFallback(
      async () => {
        const { data } = await apiClient.put(`/api/tasks/${id}`, updates);
        return data;
      },
      () => {
        const target = fallbackStore.find((task) => task.id === id);
        if (!target) {
          throw new Error(`Task with id "${id}" not found.`);
        }
        const updated = {
          ...target,
          title: updates?.title?.trim() ?? target.title,
          description: updates?.description?.trim() ?? target.description,
          status: updates?.status ?? target.status,
        };
        fallbackStore = fallbackStore.map((task) => (task.id === id ? updated : task));
        return updated;
      },
    );
  },

  async deleteTask(id) {
    return withFallback(
      async () => {
        await apiClient.delete(`/api/tasks/${id}`);
        return true;
      },
      () => {
        const before = fallbackStore.length;
        fallbackStore = fallbackStore.filter((task) => task.id !== id);
        return fallbackStore.length !== before;
      },
    );
  },

  async toggleTaskStatus(id) {
    // Reuse updateTask after determining the next status.
    return withFallback(
      async () => {
        const { data: current } = await apiClient.get(`/api/tasks/${id}`);
        const nextStatus = current.status === 'Completed' ? 'Active' : 'Completed';
        const { data } = await apiClient.put(`/api/tasks/${id}`, { status: nextStatus });
        return data;
      },
      () => {
        const target = fallbackStore.find((task) => task.id === id);
        if (!target) {
          throw new Error(`Task with id "${id}" not found.`);
        }
        const nextStatus = target.status === 'Completed' ? 'Active' : 'Completed';
        return taskApi.updateTask(id, { status: nextStatus });
      },
    );
  },

  async searchTasks(searchTerm) {
    return withFallback(
      async () => {
        const { data } = await apiClient.get('/api/tasks', {
          params: { search: searchTerm },
        });
        return data;
      },
      () => {
        const term = searchTerm.trim().toLowerCase();
        return fallbackStore.filter((task) => task.title.toLowerCase().includes(term));
      },
    );
  },

  async filterTasks(status) {
    return withFallback(
      async () => {
        const { data } = await apiClient.get('/api/tasks', {
          params: { status },
        });
        return data;
      },
      () => {
        if (!status || status === 'All') {
          return [...fallbackStore];
        }
        return fallbackStore.filter((task) => task.status === status);
      },
    );
  },
};

export default taskApi;
