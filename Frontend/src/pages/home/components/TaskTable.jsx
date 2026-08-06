import { TaskRow } from './TaskRow';

const statusOptions = ['All', 'Active', 'Inactive', 'Completed'];

// TaskTable.
// - Receives tasks as props from useTasks.
// - Renders one table row per task.
// - Shows a loading message while fetching, an empty state when there are no
//   tasks, and wires row action buttons to the provided handlers.
export function TaskTable({
  tasks = [],
  selectedStatus = 'All',
  isLoading = false,
  onFilterTask,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[20%]" />
          <col className="w-[50%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
        </colgroup>
        <thead className="border-b border-gray-200 bg-gray-100 text-xs uppercase tracking-wider text-gray-500">
          <tr>
            <th scope="col" className="border-r border-gray-200 px-5 py-4 font-semibold">
              Task
            </th>
            <th scope="col" className="border-r border-gray-200 px-5 py-4 font-semibold">
              Description
            </th>
            <th scope="col" className="border-r border-gray-200 px-5 py-3 font-semibold">
              <label className="flex items-center gap-2">
                <span>Status</span>
                <select
                  className="min-w-0 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium normal-case text-gray-700 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
                  value={selectedStatus}
                  onChange={(event) => onFilterTask?.(event.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </th>
            <th scope="col" className="px-5 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {isLoading ? (
            <tr>
              <td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-500">
                Loading tasks…
              </td>
            </tr>
          ) : tasks.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-500">
                No tasks found{selectedStatus !== 'All' ? ` with status "${selectedStatus}"` : ''}.
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <TaskRow
                key={task.id}
                rowIndex={index}
                task={task}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                onToggleTaskStatus={onToggleTaskStatus}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
