import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TaskRow } from './TaskRow';

const stateOptions = ['All', 'Active', 'Inactive'];
const statusOptions = ['All', 'Completed', 'Incomplete'];

// A simple dropdown filter placed in a table header cell.
function FilterDropdown({ value, options, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);

  function select(next) {
    onChange?.(next);
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title={`Filter by ${label}`}
        className="flex items-center gap-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs font-medium normal-case text-gray-700 hover:bg-gray-50 focus:border-sky-600 focus:outline-none"
        onClick={() => setIsOpen((v) => !v)}
      >
        {value}
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-9 z-10 w-36 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`block h-8 w-full rounded px-3 text-left text-sm ${
                option === value
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => select(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// TaskTable.
// - Receives tasks as props from useTasks.
// - Renders one table row per task with State and Status columns.
// - State and Status headers each have a dropdown filter.
// - State/Status cells are clickable to toggle.
export function TaskTable({
  tasks = [],
  selectedState = 'All',
  selectedStatus = 'All',
  isLoading = false,
  onFilterByState,
  onFilterByStatus,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
  onToggleTaskState,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[20%]" />
          <col className="w-[40%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[16%]" />
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
              <span className="mb-1 block">State</span>
              <FilterDropdown
                label="state"
                value={selectedState}
                options={stateOptions}
                onChange={onFilterByState}
              />
            </th>
            <th scope="col" className="border-r border-gray-200 px-5 py-4 text-center font-semibold">
              <span className="mb-1 block">Status</span>
              <FilterDropdown
                label="status"
                value={selectedStatus}
                options={statusOptions}
                onChange={onFilterByStatus}
              />
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
                onToggleTaskState={onToggleTaskState}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
