import { TaskRow } from './TaskRow';

export function TaskTable({
  tasks = [],
  isLoading = false,
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
          <col className="w-[20%]" />
        </colgroup>
        <thead className="border-b border-gray-200 bg-gray-100 text-xs uppercase tracking-wider text-gray-500">
          <tr>
            <th scope="col" className="border-r border-gray-200 px-5 py-4 font-semibold">
              Task
            </th>
            <th scope="col" className="border-r border-gray-200 px-5 py-4 font-semibold">
              Description
            </th>
            <th scope="col" className="border-r border-gray-200 px-5 py-4 text-center font-semibold">
              Status
            </th>
            <th scope="col" className="px-5 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-500">
                Loading tasks…
              </td>
            </tr>
          ) : tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-500">
                No tasks found.
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
