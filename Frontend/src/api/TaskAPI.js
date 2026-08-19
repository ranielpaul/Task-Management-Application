import { apiClient } from './Axios';

export const taskApi = {
  async fetchTasks({ search, isComplete } = {}) {
    const response = await apiClient.get('/api/tasks', {
      params: {
        ...(search ? { search } : {}),
        ...(isComplete !== undefined ? { is_complete: isComplete } : {}),
      },
    });
    return response.data;
  },

  async createTask({ title, description, isComplete = false }) {
    const response = await apiClient.post('/api/tasks', {
      title: title.trim(),
      description: (description ?? '').trim(),
      is_complete: isComplete,
    });
    return response.data;
  },

  async updateTask(id, updates) {
    const response = await apiClient.put(`/api/tasks/${id}`, {
      ...(updates.title !== undefined ? { title: updates.title.trim() } : {}),
      ...(updates.description !== undefined
        ? { description: updates.description.trim() }
        : {}),
      ...(updates.isComplete !== undefined ? { is_complete: updates.isComplete } : {}),
    });
    return response.data;
  },

  async deleteTask(id) {
    await apiClient.delete(`/api/tasks/${id}`);
    return true;
  },

  async toggleTaskComplete(id) {
    const response = await apiClient.patch(`/api/tasks/${id}/toggle`);
    return response.data;
  },

  async searchTasks(searchTerm) {
    return taskApi.fetchTasks({ search: searchTerm });
  },

  async filterTasksByComplete(isComplete) {
    return taskApi.fetchTasks({ isComplete });
  },
};

export default taskApi;