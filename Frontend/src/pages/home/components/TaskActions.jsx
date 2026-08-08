import { Pencil, Trash2 } from 'lucide-react';

export function DeleteTaskButton({ task, onDeleteTask }) {
  function handleDelete() {
    const confirmed = window.confirm(`Delete task "${task?.title ?? 'this task'}"?`);
    if (confirmed) {
      onDeleteTask?.(task);
    }
  }

  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-red-500 hover:bg-gray-100"
      aria-label="Delete task"
      title="Delete task"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

export function EditTaskButton({ task, onEditTask }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-sky-600 hover:bg-gray-100"
      aria-label="Edit task"
      title="Edit task"
      onClick={() => onEditTask?.(task)}
    >
      <Pencil className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

export function TaskActions({ task, onEditTask, onDeleteTask }) {
  return (
    <div className="flex justify-center gap-2">
      <EditTaskButton task={task} onEditTask={onEditTask} />
      <DeleteTaskButton task={task} onDeleteTask={onDeleteTask} />
    </div>
  );
}

export default TaskActions;
