import { useMemo, useState } from 'react';

/*
  useTasks hook placeholder.

  Future contents:
  - Call TaskAPI functions.
  - Replace local-only state with backend-backed task data.
*/

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, selectedStatus]);

  function openAddTaskForm() {
    setSelectedTask(null);
    setIsTaskFormOpen(true);
  }

  function closeTaskForm() {
    setSelectedTask(null);
    setIsTaskFormOpen(false);
  }

  function createTask(taskData) {
    if (!taskData.title.trim()) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        status: 'Active',
      },
    ]);
    closeTaskForm();
  }

  function editTask(taskOrData) {
    if (!taskOrData?.title && taskOrData?.id) {
      setSelectedTask(taskOrData);
      setIsTaskFormOpen(true);
      return;
    }

    if (!taskOrData.title.trim()) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === selectedTask?.id
          ? { ...task, title: taskOrData.title.trim(), description: taskOrData.description.trim() }
          : task,
      ),
    );
    closeTaskForm();
  }

  function deleteTask(taskToDelete) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskToDelete?.id));
  }

  function toggleTaskStatus(taskToToggle) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskToToggle?.id
          ? { ...task, status: task.status === 'Completed' ? 'Active' : 'Completed' }
          : task,
      ),
    );
  }

  function searchTasks(nextSearchTerm) {
    setSearchTerm(nextSearchTerm);
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
    openAddTaskForm,
    closeTaskForm,
    createTask,
    editTask,
    deleteTask,
    toggleTaskStatus,
    searchTasks,
    filterTasks,
  };
}

export default useTasks;
