import { useEffect, useMemo, useState } from 'react';
import { taskApi } from '../api/TaskAPI';

/*
  useTasks hook.

  Owns task state, loading/error state, and the CRUD/search/filter handlers.
  All data operations go through taskApi so the hook is ready to use the real
  backend API once it is implemented.

  Search behavior:
  - Typing in the input updates `searchTerm` (the text shown in the box).
  - Results are only recomputed after the search button is pressed, which
    copies `searchTerm` into `appliedSearchTerm`.
  - The status filter, by contrast, applies immediately.
*/

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Load tasks from the API on mount.
  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        setIsLoading(true);
        setError('');
        const data = await taskApi.fetchTasks();
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
  }, []);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(appliedSearchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, appliedSearchTerm, selectedStatus]);

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

  async function editTask(taskOrData) {
    // Called with a task object to select it for editing.
    if (!taskOrData?.title && taskOrData?.id) {
      selectTaskForEdit(taskOrData);
      return;
    }

    if (!taskOrData.title.trim()) {
      return;
    }

    try {
      setError('');
      const updatedTask = await taskApi.updateTask(selectedTask?.id, taskOrData);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
      closeTaskForm();
    } catch (err) {
      setError(err?.message ?? 'Failed to update task.');
    }
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

  function searchTasks(nextSearchTerm) {
    setSearchTerm(nextSearchTerm);
  }

  function applySearch() {
    setAppliedSearchTerm(searchTerm);
  }

  function filterTasks(nextStatus) {
    setSelectedStatus(nextStatus);
  }

  return {
    tasks: visibleTasks,
    searchTerm,
    selectedStatus,
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
    searchTasks,
    applySearch,
    filterTasks,
  };
}

export default useTasks;
