import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// A compact dropdown filter control used in the header (outside the table).
// Options render as a small popover menu.
export function FilterDropdown({ label, value, options, onChange }) {
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
        aria-label={`Filter by ${label}`}
        title={`Filter by ${label}`}
        className="flex h-10 items-center gap-1 border hover:border-teal-600 border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-sky-600 focus:outline-none"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="text-xs uppercase tracking-wide text-gray-400">{label}:</span>
        <span className="max-w-[7rem] truncate">{value}</span>
        <ChevronDown className="h-3 w-3 shrink-0" aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close filter menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-11 z-20 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`flex h-9 w-full items-center rounded px-3 text-left text-sm ${
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
        </>
      )}
    </div>
  );
}

export default FilterDropdown;
