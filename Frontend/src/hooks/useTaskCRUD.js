import { useEffect, useState } from 'react';
import { taskApi } from '../api/TaskAPI';


export function useTaskCRUD(filters) {
  const [tasks, setTasks] = useState([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Load tasks from the API on mount and whenever the filters change.
  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        setIsLoading(true);
        setError('');
        const data = await taskApi.fetchTasks(filters);
        if (isMounted) {
          setTasks(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message ?? 'Failed to load tasks.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, [filters?.search, filters?.state, filters?.status]);

  function openAddTaskForm() {
    setSelectedTask(null);
    setIsTaskFormOpen(true);
  }

  function closeTaskForm() {
    setSelectedTask(null);
    setIsTaskFormOpen(false);
  }

  async function createTask(taskData) {
    if (!taskData.title.trim()) {
      return;
    }

    try {
      setError('');
      const createdTask = await taskApi.createTask(taskData);
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      closeTaskForm();
    } catch (err) {
      setError(err?.message ?? 'Failed to create task.');
    }
  }

  function selectTaskForEdit(task) {
    setSelectedTask(task);
    setIsTaskFormOpen(true);
  }

  // Called two ways:
  // 1. From a row Edit button with the full task object (has an `id`) -> open
  //    the edit modal for that task.
  // 2. From the EditTaskForm submit with `{ title, description, state, status }`
  //    (no `id`) -> save the changes to the currently selected task.
  function editTask(taskOrData) {
    if (taskOrData?.id) {
      selectTaskForEdit(taskOrData);
      return;
    }

    if (!taskOrData.title.trim()) {
      return;
    }

    const taskId = selectedTask?.id;
    if (!taskId) {
      setError('No task selected for editing.');
      return;
    }

    return taskApi
      .updateTask(taskId, taskOrData)
      .then((updatedTask) => {
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        );
        closeTaskForm();
      })
      .catch((err) => setError(err?.message ?? 'Failed to update task.'));
  }

  async function deleteTask(taskToDelete) {
    try {
      setError('');
      await taskApi.deleteTask(taskToDelete?.id);
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskToDelete?.id),
      );
    } catch (err) {
      setError(err?.message ?? 'Failed to delete task.');
    }
  }

  async function toggleTaskStatus(taskToToggle) {
    try {
      setError('');
      const updatedTask = await taskApi.toggleTaskStatus(taskToToggle?.id);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    } catch (err) {
      setError(err?.message ?? 'Failed to update task status.');
    }
  }

  async function toggleTaskState(taskToToggle) {
    try {
      setError('');
      const updatedTask = await taskApi.toggleTaskState(taskToToggle?.id);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    } catch (err) {
      setError(err?.message ?? 'Failed to update task state.');
    }
  }

  return {
    tasks,
    isTaskFormOpen,
    selectedTask,
    isLoading,
    error,
    openAddTaskForm,
    closeTaskForm,
    createTask,
    editTask,
    deleteTask,
    toggleTaskStatus,
    toggleTaskState,
  };
}

export default useTaskCRUD;
