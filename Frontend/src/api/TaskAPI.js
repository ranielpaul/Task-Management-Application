import { apiClient } from './Axios';

export const taskApi = {
  // Get all tasks. Optionally pass { search, state, status } to filter server-side.
  async fetchTasks({ search, state, status } = {}) {
    const response = await apiClient.get('/api/tasks', {
      params: {
        ...(search ? { search } : {}),
        ...(state && state !== 'All' ? { state } : {}),
        ...(status && status !== 'All' ? { status } : {}),
      },
    });
    return response.data;
  },

  // Create a new task.
  async createTask({ title, description, state = 'Active', status = 'Incomplete' }) {
    const response = await apiClient.post('/api/tasks', {
      title: title.trim(),
      description: (description ?? '').trim(),
      state,
      status,
    });
    return response.data;
  },

  // Update task title, description, state, and/or status by id.
  async updateTask(id, updates) {
    const response = await apiClient.put(`/api/tasks/${id}`, {
      ...(updates.title !== undefined ? { title: updates.title.trim() } : {}),
      ...(updates.description !== undefined
        ? { description: updates.description.trim() }
        : {}),
      ...(updates.state !== undefined ? { state: updates.state } : {}),
      ...(updates.status !== undefined ? { status: updates.status } : {}),
    });
    return response.data;
  },

  // Delete a task by id.
  async deleteTask(id) {
    await apiClient.delete(`/api/tasks/${id}`);
    return true;
  },

  // Toggle a task's status between Completed and Incomplete.
  async toggleTaskStatus(id) {
    const response = await apiClient.patch(`/api/tasks/${id}/toggle`);
    return response.data;
  },

  // Toggle a task's state between Active and Inactive.
  async toggleTaskState(id) {
    const current = await apiClient.get(`/api/tasks/${id}`);
    const nextState = current.data.state === 'Active' ? 'Inactive' : 'Active';
    return taskApi.updateTask(id, { state: nextState });
  },

  // Search tasks by name (server-side substring/ilike).
  async searchTasks(searchTerm) {
    return taskApi.fetchTasks({ search: searchTerm });
  },

  // Filter tasks by state (All, Active, Inactive).
  async filterTasksByState(state) {
    return taskApi.fetchTasks({ state });
  },

  // Filter tasks by status (All, Completed, Incomplete).
  async filterTasksByStatus(status) {
    return taskApi.fetchTasks({ status });
  },
};

export default taskApi;
