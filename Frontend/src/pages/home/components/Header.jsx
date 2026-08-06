// SearchFilterControls placeholder.
// Future contents:
// - Search input for task title, category, or description.
// - Filter controls for all, active, inactive, and completed tasks.
// - Combined behavior with the current search value.
export function SearchFilterControls() {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_180px]">
      <div className="h-8 rounded bg-gray-100" />
      <div className="h-8 rounded bg-gray-100" />
    </div>
  );
}

// Header placeholder.
// Future contents:
// - Dashboard title or summary text.
// - Add task button if the form is opened from the header.
// - SearchFilterControls for locating and filtering tasks.
export function Header() {
  return (
    <header className="rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm">
      <SearchFilterControls />
    </header>
  );
}

export default Header;
