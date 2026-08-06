import { TaskActions } from './TaskActions';

const placeholderCells = ['task', 'description', 'status'];

// TaskRow placeholder.
// Future contents:
// - Receive one task object from TaskTable.
// - Display task fields in the correct table columns.
// - Pass row-specific handlers to TaskActions.
export function TaskRow() {
  return (
    <tr>
      {placeholderCells.map((cell) => (
        <td key={cell} className="px-4 py-4">
          <div className="h-4 rounded bg-gray-100" />
        </td>
      ))}
      <td className="px-4 py-4">
        <TaskActions />
      </td>
    </tr>
  );
}

export default TaskRow;
