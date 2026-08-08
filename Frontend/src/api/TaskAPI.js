import { apiClient } from './Axios';

export const taskApi = {
  // Get all tasks. Optionally pass { search, status } to filter server-side.
  async fetchTasks({ search, status } = {}) {
    const response = await apiClient.get('/api/tasks', {
      params: {
        ...(search ? { search } : {}),
        ...(status && status !== 'All' ? { status } : {}),
      },
    });
    return response.data;
  },

  // Create a new task.
  async createTask({ title, description, status = 'Active' }) {
    const response = await apiClient.post('/api/tasks', {
      title: title.trim(),
      description: (description ?? '').trim(),
      status,
    });
    return response.data;
  },

  // Update task title, description, and/or status by id.
  async updateTask(id, updates) {
    const response = await apiClient.put(`/api/tasks/${id}`, {
      ...(updates.title !== undefined ? { title: updates.title.trim() } : {}),
      ...(updates.description !== undefined
        ? { description: updates.description.trim() }
        : {}),
      ...(updates.status !== undefined ? { status: updates.status } : {}),
    });
    return response.data;
  },

  // Delete a task by id.
  async deleteTask(id) {
    await apiClient.delete(`/api/tasks/${id}`);
    return true;
  },

  // Toggle a task between Completed and Active.
  async toggleTaskStatus(id) {
    const current = await apiClient.get(`/api/tasks/${id}`);
    const nextStatus = current.data.status === 'Completed' ? 'Active' : 'Completed';
    return taskApi.updateTask(id, { status: nextStatus });
  },

  // Search tasks by name (server-side substring/ilike).
  async searchTasks(searchTerm) {
    return taskApi.fetchTasks({ search: searchTerm });
  },

  // Filter tasks by All, Active, Inactive, or Completed.
  async filterTasks(status) {
    return taskApi.fetchTasks({ status });
  },
};

export default taskApi;
