import { Plus } from 'lucide-react';
import Header from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskTable } from './components/TaskTable';
import { useTasks } from '../../hooks/useTasks';

// Home page scaffold.
// Future contents:
// - Connect task data and CRUD handlers to the components below.
// - Keep page composition here while keeping individual UI sections in components.
export function Home() {
  const {
    tasks,
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
  } = useTasks();

  return (
    <main className="space-y-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        Task Management Dashboard
      </h1>
        
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

      <section className="overflow-visible rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-4">
          <Header
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            onSearchTask={searchTasks}
            onFilterTask={filterTasks}
          />
        </div>

        <TaskTable
          tasks={tasks}
          selectedStatus={selectedStatus}
          onFilterTask={filterTasks}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onToggleTaskStatus={toggleTaskStatus}
        />
      </section>
    </main>
  );
}

export default Home;
