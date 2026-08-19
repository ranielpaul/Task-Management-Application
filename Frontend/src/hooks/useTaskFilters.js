import { useMemo, useState } from 'react';

export function useTaskFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [selectedComplete, setSelectedComplete] = useState('All');

  function searchTasks(nextSearchTerm) {
    setSearchTerm(nextSearchTerm);
  }

  function applySearch() {
    setAppliedSearchTerm(searchTerm);
  }

  function filterByComplete(nextComplete) {
    setSelectedComplete(nextComplete);
  }

  const filters = useMemo(() => ({
    search: appliedSearchTerm || undefined,
    isComplete: selectedComplete === 'All' ? undefined : selectedComplete === 'Completed',
  }), [appliedSearchTerm, selectedComplete]);

  return {
    searchTerm,
    appliedSearchTerm,
    selectedComplete,
    filters,
    searchTasks,
    applySearch,
    filterByComplete,
  };
}

export default useTaskFilters;
