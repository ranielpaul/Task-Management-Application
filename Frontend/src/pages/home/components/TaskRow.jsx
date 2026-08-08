import { TaskActions } from './TaskActions';

export function TaskRow({
  task,
  rowIndex = 0,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
  onToggleTaskState,
}) {
  return (
    <tr className={`text-gray-700 transition ${rowIndex % 2 === 1 ? 'bg-gray-50' : ''}`}>
      <th scope="row" className="border-r border-gray-200 px-5 py-4 font-medium">
        {rowIndex + 1}. {task?.title ?? <div className="h-4 rounded bg-gray-100" />}
      </th>
      <td className="border-r border-gray-200 px-5 py-4">
        {task?.description ?? <div className="h-4 rounded bg-gray-100" />}
      </td>
      <td className="border-r border-gray-200 px-5 py-4 text-center">
        <button
          type="button"
          title="Click to toggle Active/Inactive"
          onClick={() => onToggleTaskState?.(task)}
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-80 ${
            task?.state === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {task?.state ?? 'No state'}
        </button>
      </td>
      <td className="border-r border-gray-200 px-5 py-4 text-center">
        <button
          type="button"
          title="Click to toggle Completed/Incomplete"
          onClick={() => onToggleTaskStatus?.(task)}
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-80 ${
            task?.status === 'Completed'
              ? 'bg-sky-100 text-sky-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {task?.status ?? 'No status'}
        </button>
      </td>
      <td className="px-5 py-4 text-center">
        <TaskActions
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      </td>
    </tr>
  );
}

export default TaskRow;
