import { Plus } from 'lucide-react';
import Header from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskTable } from './components/TaskTable';
import { useTasks } from '../../hooks/useTasks';

// Home page.
// - Connects task data, loading/error state, and CRUD handlers to the UI.
// - Keeps page composition here while individual UI sections live in components.
export function Home() {
  const {
    tasks,
    searchTerm,
    selectedState,
    selectedStatus,
    isTaskFormOpen,
    selectedTask,
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
    isLoading,
    error,
  } = useTasks();

  return (
    <main className="space-y-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        Task Management Dashboard
      </h1>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          className="flex h-9 w-fit items-center gap-2 rounded bg-teal-600 px-4 text-sm font-medium text-white hover:bg-teal-700"
          onClick={openAddTaskForm}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Task
        </button>
      </div>

      <TaskForm
        isOpen={isTaskFormOpen}
        selectedTask={selectedTask}
        onCreateTask={createTask}
        onEditTask={editTask}
        onCancel={closeTaskForm}
      />

      <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-4">
          <Header
            searchTerm={searchTerm}
            selectedState={selectedState}
            selectedStatus={selectedStatus}
            onSearchTask={searchTasks}
            onApplySearch={applySearch}
            onFilterByState={filterByState}
            onFilterByStatus={filterByStatus}
          />
        </div>

        <TaskTable
          tasks={tasks}
          isLoading={isLoading}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onToggleTaskStatus={toggleTaskStatus}
          onToggleTaskState={toggleTaskState}
        />
      </section>
    </main>
  );
}

export default Home;
