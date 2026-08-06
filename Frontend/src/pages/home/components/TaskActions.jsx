function EmptyActionButton({ label }) {
  return (
    <button
      type="button"
      className="h-8 w-16 rounded border border-dashed border-gray-300 bg-gray-50"
      aria-label={label}
    />
  );
}

// MarkTaskButton placeholder.
// Future contents:
// - Toggle the row task between complete and incomplete.
// - Call the status update handler from useTasks.
export function MarkTaskButton() {
  return <EmptyActionButton label="Mark task placeholder" />;
}

// DeleteTaskButton placeholder.
// Future contents:
// - Ask for confirmation before deleting a task.
// - Call the delete task handler from useTasks.
export function DeleteTaskButton() {
  return <EmptyActionButton label="Delete task placeholder" />;
}

// EditTaskButton placeholder.
// Future contents:
// - Open the task form in edit mode for the selected row.
// - Pass the selected task into the edit flow.
export function EditTaskButton() {
  return <EmptyActionButton label="Edit task placeholder" />;
}

// TaskActions placeholder.
// Future contents:
// - Receive a task object and row action handlers as props.
// - Render edit, mark complete, and delete controls for one task row.
export function TaskActions() {
  return (
    <div className="flex gap-2">
      <EditTaskButton />
      <MarkTaskButton />
      <DeleteTaskButton />
    </div>
  );
}

export default TaskActions;
