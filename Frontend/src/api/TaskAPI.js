import { apiClient } from './Axios';

export const taskApi = {
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
  async createTask({ title, description, status = 'Incomplete' }) {
    const response = await apiClient.post('/api/tasks', {
      title: title.trim(),
      description: (description ?? '').trim(),
      status,
    });
    return response.data;
  },

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

  async deleteTask(id) {
    await apiClient.delete(`/api/tasks/${id}`);
    return true;
  },

  async toggleTaskStatus(id) {
    const response = await apiClient.patch(`/api/tasks/${id}/toggle`);
    return response.data;
  },


  async searchTasks(searchTerm) {
    return taskApi.fetchTasks({ search: searchTerm });
  },


  async filterTasksByStatus(status) {
    return taskApi.fetchTasks({ status });
  },
};

export default taskApi;
