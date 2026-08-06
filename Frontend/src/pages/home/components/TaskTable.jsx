import { TaskRow } from './TaskRow';

const columns = ['Task', 'Description', 'Due Date', 'Priority', 'Category', 'Status', 'Actions'];

// TaskTable placeholder.
// Future contents:
// - Receive tasks as props or from useTasks.
// - Render one table row per task.
// - Wire row action buttons to edit, delete, and mark-complete handlers.
export function TaskTable() {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            <TaskRow />
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskTable;
