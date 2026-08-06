import { TaskActions } from './TaskActions';

// TaskRow placeholder.
// Future contents:
// - Receive one task object from TaskTable.
// - Display task fields in the correct table columns.
// - Pass row-specific handlers to TaskActions.
export function TaskRow({
  task,
  rowIndex = 0,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
}) {
  return (
    <tr className={`text-gray-700 transition ${rowIndex % 2 === 1 ? 'bg-gray-50' : ''}`}>
      <th scope="row" className="border-r border-gray-200 px-5 py-4 font-medium ">
        {rowIndex+1 +"."} {task?.title ?? <div className="h-4 rounded bg-gray-100" />}
      </th>
      <td className="border-r border-gray-200 px-5 py-4">
        {task?.description ?? <div className="h-4 rounded bg-gray-100" />}
      </td>
      <td className="border-r border-gray-200 px-5 py-4">
        <span className="flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {task?.status ?? 'No status'}
        </span>
      </td>
      <td className="px-5 py-4">
        <TaskActions
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onToggleTaskStatus={onToggleTaskStatus}
        />
      </td>
    </tr>
  );
}

export default TaskRow;
