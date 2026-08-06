import { useState } from 'react';

// SearchFilterControls placeholder.
// Future contents:
// - Open or close this status dropdown from the filter button.
// - Filter tasks by All, Active, Inactive, or Completed.
// - Combine the selected status with the task name search value.
export function SearchFilterControls() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-fit">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="h-9 rounded border border-gray-300 bg-white px-4 text-sm text-gray-700 shadow-sm"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        Filter
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-10 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
          {['All', 'Active', 'Inactive', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              className="block h-8 w-full rounded px-3 text-left text-sm text-gray-700"
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Header placeholder.
// Future contents:
// - Dashboard title or summary text.
// - Add task button if the form is opened from the header.
// - Search input for finding tasks by name.
// - SearchFilterControls for status filtering.
export function Header() {
  return (
    <header className="rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="h-8 w-64 rounded bg-gray-100" />
        <div className="flex gap-3">
          <div className="h-9 w-64 rounded border border-dashed border-gray-300 bg-gray-50" />
          <SearchFilterControls />
        </div>
      </div>
    </header>
  );
}

export default Header;
