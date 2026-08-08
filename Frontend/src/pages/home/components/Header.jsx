import { useState } from 'react';
import { Search, Funnel } from 'lucide-react';

const statusOptions = ['All', 'Active', 'Inactive', 'Completed'];

// StatusDropdown placeholder.
// Future contents:
// - Reuse this menu for table filtering and row status selection.
// - Persist the selected option through useTasks once task state is implemented.
export function StatusDropdown({
  selectedStatus = 'All',
  onStatusChange,
  label = 'Filter status',
  align = 'right',
  joined = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title={`${label}: ${selectedStatus}`}
        className={`flex h-10 w-full items-center justify-center gap-2 border border-gray-300 bg-white px-3 text-sm text-gray-700 shadow-sm hover:bg-gray-50 ${
          joined ? 'rounded-r-lg border-l-0' : 'rounded-lg'
        }`}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <Funnel className="h-4 w-4" aria-hidden="true" />
        <span className="truncate">{selectedStatus}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-12 z-10 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-sm ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              className={`block h-8 w-full rounded px-3 text-left text-sm ${
                status === selectedStatus
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                onStatusChange?.(status);
                setIsOpen(false);
              }}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// SearchFilterControls placeholder.
export function SearchFilterControls({ selectedStatus = 'All', onFilterTask }) {
  return (
    <StatusDropdown
      selectedStatus={selectedStatus}
      onStatusChange={onFilterTask}
      label="Filter tasks"
      joined
    />
  );
}

// Header placeholder.
// Future contents:
// - Dashboard title or summary text.
// - Search input for finding tasks by name.
// - SearchFilterControls for status filtering.
export function Header({
  searchTerm = '',
  selectedStatus = 'All',
  onSearchTask,
  onApplySearch,
  onFilterTask,
}) {
  return (
    <div className="grid w-full grid-cols-[80%_10%_10%]">
      <input
        type="search"
        value={searchTerm}
        placeholder="Search task"
        className="h-10 w-full rounded-l-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 hover:border-teal-600 focus:outline-none"
        onChange={(event) => onSearchTask?.(event.target.value)}
      />
      <button
        type="button"
        className="flex h-10 w-full items-center justify-center gap-x-2 border-y border-gray-300 bg-teal-600 px-4 text-white hover:bg-teal-700"
        onClick={() => onApplySearch?.()}
      >
        <p> Search </p> 
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Search task</span>
      </button>
      <SearchFilterControls selectedStatus={selectedStatus} onFilterTask={onFilterTask} />
    </div>
  );
}

export default Header;
