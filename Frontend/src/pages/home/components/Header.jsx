import { Search, X } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';

const stateOptions = ['All', 'Active', 'Inactive'];
const statusOptions = ['All', 'Completed', 'Incomplete'];

export function Header({
  searchTerm = '',
  selectedState = 'All',
  selectedStatus = 'All',
  onSearchTask,
  onApplySearch,
  onFilterByState,
  onFilterByStatus,
}) {
  function handleChange(event) {
    onSearchTask?.(event.target.value);
    // When the field is emptied, immediately reset the applied search.
    if (event.target.value === '') {
      onApplySearch?.();
    }
  }

  function clearSearch() {
    onSearchTask?.('');
    onApplySearch?.();
  }

  return (
    <div className="flex w-full flex-wrap items-center">
      <div className="min-w-0 flex-1">
        <label className="sr-only" htmlFor="task-search">
          Search task
        </label>
        <div className="relative">
          <input
            id="task-search"
            type="search"
            value={searchTerm}
            placeholder="Search task"
            className="h-10 w-full rounded-l-xl border border-gray-300 bg-white px-3 pr-9 text-sm text-gray-700 hover:border-teal-600 focus:outline-none focus:border-sky-600"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center">
        <FilterDropdown
          label="State"
          value={selectedState}
          options={stateOptions}
          onChange={onFilterByState}
        />
        <FilterDropdown
          label="Status"
          value={selectedStatus}
          options={statusOptions}
          onChange={onFilterByStatus}
        />        
      </div>
      <button
        type="button"
        className="flex h-10 items-center gap-2 rounded-r-xl bg-teal-600 px-4 text-sm font-medium text-white hover:bg-teal-700"
        onClick={() => onApplySearch?.()}
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        Search
      </button>      
    </div>
  );
}

export default Header;
