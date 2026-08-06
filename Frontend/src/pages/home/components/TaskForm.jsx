function EmptyFormCard({ label }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 h-4 w-24 rounded bg-gray-100" aria-label={label} />
      <div className="space-y-2">
        <div className="h-9 rounded border border-dashed border-gray-300 bg-gray-50" />
        <div className="h-9 rounded border border-dashed border-gray-300 bg-gray-50" />
      </div>
    </article>
  );
}

// AddTaskForm placeholder.
// Future contents:
// - Form fields for task title and description.
// - Submit button that calls the create task handler from useTasks.
export function AddTaskForm() {
  return <EmptyFormCard label="Add task form placeholder" />;
}

// EditTaskForm placeholder.
// Future contents:
// - Form fields prefilled with the selected task.
// - Submit button that updates the task title and description through useTasks.
export function EditTaskForm() {
  return <EmptyFormCard label="Edit task form placeholder" />;
}

// TaskForm placeholder.
// Future contents:
// - Decide whether to show add or edit mode.
// - Receive form submit handlers from the home page or useTasks.
export function TaskForm() {
  return <AddTaskForm />;
}

export default TaskForm;
