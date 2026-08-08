import { Search } from 'lucide-react';

// Header.
// - Contains only the search bar and search button.
// - State and Status filtering is handled in the TaskTable header dropdowns.
export function Header({ searchTerm = '', onSearchTask, onApplySearch }) {
  return (
    <div className="grid w-full grid-cols-[90%_10%]">
      <input
        type="search"
        value={searchTerm}
        placeholder="Search task"
        className="h-10 w-full rounded-l-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 hover:border-teal-600 focus:outline-none"
        onChange={(event) => onSearchTask?.(event.target.value)}
      />
      <button
        type="button"
        className="flex h-10 w-full items-center rounded-r-lg justify-center gap-x-2 border-y border-gray-300 bg-teal-600 px-4 text-white hover:bg-teal-700"
        onClick={() => onApplySearch?.()}
      >
        <p> Search </p>
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Search task</span>
      </button>
    </div>
  );
}

export default Header;
