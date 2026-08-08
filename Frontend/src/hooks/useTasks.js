import { useEffect, useMemo, useState } from 'react';
import { taskApi } from '../api/TaskAPI';

/*
  useTasks hook.

  Owns task state, loading/error state, and the CRUD/search/filter handlers.
  All data operations go through taskApi so the hook talks to the real backend.

  Search behavior:
  - Typing in the input updates `searchTerm` (the text shown in the box).
  - Results are only recomputed after the search button is pressed, which
    copies `searchTerm` into `appliedSearchTerm`.
  - The state and status filters apply immediately.
*/

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Load tasks from the API on mount and whenever the applied search or
  // selected state/status change, so filtering and search are handled server-side.
  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        setIsLoading(true);
        setError('');
        const data = await taskApi.fetchTasks({
          search: appliedSearchTerm || undefined,
          state: selectedState,
          status: selectedStatus,
        });
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
  }, [appliedSearchTerm, selectedState, selectedStatus]);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(appliedSearchTerm.toLowerCase());
      const matchesState =
        selectedState === 'All' || task.state === selectedState;
      const matchesStatus =
        selectedStatus === 'All' || task.status === selectedStatus;

      return matchesSearch && matchesState && matchesStatus;
    });
  }, [tasks, appliedSearchTerm, selectedState, selectedStatus]);

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

  // Toggle a task's status (Completed <-> Incomplete). Called by clicking the
  // Status cell in the table.
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

  // Toggle a task's state (Active <-> Inactive). Called by clicking the State
  // cell in the table.
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

  function searchTasks(nextSearchTerm) {
    setSearchTerm(nextSearchTerm);
  }

  function applySearch() {
    setAppliedSearchTerm(searchTerm);
  }

  function filterByState(nextState) {
    setSelectedState(nextState);
  }

  function filterByStatus(nextStatus) {
    setSelectedStatus(nextStatus);
  }

  return {
    tasks: visibleTasks,
    searchTerm,
    selectedState,
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
    toggleTaskState,
    searchTasks,
    applySearch,
    filterByState,
    filterByStatus,
  };
}

export default useTasks;
