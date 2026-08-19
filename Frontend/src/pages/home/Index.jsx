import { Plus } from 'lucide-react';
import Header from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskTable } from './components/TaskTable';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { useTaskCRUD } from '../../hooks/useTaskCRUD';

export function Home() {
  const {
    searchTerm,
    selectedComplete,
    filters,
    searchTasks,
    applySearch,
    filterByComplete,
  } = useTaskFilters();

  const {
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
  } = useTaskCRUD(filters);

  return (
    <main className="space-y-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        Task Management Dashboard
      </h1>

      {error && (
        console.log(error)
      )}

      <div className="flex justify-between">

        <p className = "text-sm text-gray-500">
          Status can be toggled by clicking on the respective columns in the table or via the Actions modal.
        </p>

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
          selectedComplete={selectedComplete}
          onSearchTask={searchTasks}
          onApplySearch={applySearch}
          onFilterByComplete={filterByComplete}
        />
        </div>

        <TaskTable
          tasks={tasks}
          isLoading={isLoading}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onToggleTaskStatus={toggleTaskStatus}
        />
      </section>
    </main>
  );
}

export default Home;
