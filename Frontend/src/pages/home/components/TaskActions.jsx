import { CheckCircle2, Pencil, Trash2 } from 'lucide-react';

// MarkTaskButton placeholder.
// Future contents:
// - Toggle the row task between complete and incomplete.
// - Call the status update handler from useTasks.
export function MarkTaskButton({ task, onToggleTaskStatus }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-teal-600 hover:bg-gray-100"
      aria-label="Complete task"
      title="Complete task"
      onClick={() => onToggleTaskStatus?.(task)}
    >
      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

// DeleteTaskButton placeholder.
// Future contents:
// - Ask for confirmation before deleting a task.
// - Call the delete task handler from useTasks.
export function DeleteTaskButton({ task, onDeleteTask }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-red-500 hover:bg-gray-100"
      aria-label="Delete task"
      title="Delete task"
      onClick={() => onDeleteTask?.(task)}
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

// EditTaskButton placeholder.
// Future contents:
// - Open the task form in edit mode for the selected row.
// - Pass the selected task into the edit flow.
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

// TaskActions placeholder.
// Future contents:
// - Receive a task object and row action handlers as props.
// - Render edit, mark complete, and delete controls for one task row.
export function TaskActions({ task, onEditTask, onDeleteTask, onToggleTaskStatus }) {
  return (
    <div className="flex gap-2">
      <EditTaskButton task={task} onEditTask={onEditTask} />
      <MarkTaskButton task={task} onToggleTaskStatus={onToggleTaskStatus} />
      <DeleteTaskButton task={task} onDeleteTask={onDeleteTask} />
    </div>
  );
}

export default TaskActions;
