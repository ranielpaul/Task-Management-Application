import { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

function EmptyFormField({ label, value, onChange }) {
  return (
    <input
      type="text"
      aria-label={label}
      value={value}
      placeholder={label}
      className="h-9 rounded border border-gray-300 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

// AddTaskForm placeholder.
// Future contents:
// - Form fields for task title and description.
// - Submit button that calls the create task handler from useTasks.
export function AddTaskForm({ onCreateTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="space-y-3">
        <EmptyFormField label="Task title" value={title} onChange={setTitle} />
        <EmptyFormField label="Task description" value={description} onChange={setDescription} />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded bg-teal-600 px-4 text-sm font-medium text-white hover:bg-teal-700"
          onClick={() => onCreateTask?.({ title, description })}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Task
        </button>
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded border border-gray-300 px-4 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onCancel}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Cancel
        </button>
      </div>
    </article>
  );
}

// EditTaskForm placeholder.
// Future contents:
// - Form fields prefilled with the selected task.
// - Submit button that updates the task title and description through useTasks.
export function EditTaskForm({ selectedTask, onEditTask, onCancel }) {
  const [title, setTitle] = useState(selectedTask?.title ?? '');
  const [description, setDescription] = useState(selectedTask?.description ?? '');

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="space-y-3">
        <EmptyFormField label="Task title" value={title} onChange={setTitle} />
        <EmptyFormField label="Task description" value={description} onChange={setDescription} />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700"
          onClick={() => onEditTask?.({ title, description })}
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Save Task
        </button>
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded border border-gray-300 px-4 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onCancel}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Cancel
        </button>
      </div>
    </article>
  );
}

// TaskForm placeholder.
// Future contents:
// - Decide whether to show add or edit mode.
// - Receive form submit handlers from the home page or useTasks.
export function TaskForm({ isOpen = false, selectedTask, onCreateTask, onEditTask, onCancel }) {
  if (!isOpen) {
    return null;
  }

  if (selectedTask) {
    return (
      <EditTaskForm
        key={selectedTask.id}
        selectedTask={selectedTask}
        onEditTask={onEditTask}
        onCancel={onCancel}
      />
    );
  }

  return <AddTaskForm onCreateTask={onCreateTask} onCancel={onCancel} />;
}

export default TaskForm;
