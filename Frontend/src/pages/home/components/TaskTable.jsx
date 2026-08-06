import { Funnel } from 'lucide-react';
import { TaskRow } from './TaskRow';

const statusOptions = ['All', 'Active', 'Inactive', 'Completed'];

// TaskTable placeholder.
// Future contents:
// - Receive tasks as props or from useTasks.
// - Render one table row per task.
// - Wire row action buttons to edit, delete, and mark-complete handlers.
export function TaskTable({
  tasks = [],
  selectedStatus = 'All',
  onFilterTask,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
}) {
  const rows = tasks.length > 0 ? tasks : [null];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[60%]" />
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
                    <option key={status} value={status} className="flex items-center justify-center">
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
          {rows.map((task, index) => (
            <TaskRow
              key={task?.id ?? `placeholder-${index}`}
              rowIndex={index}
              task={task}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onToggleTaskStatus={onToggleTaskStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
