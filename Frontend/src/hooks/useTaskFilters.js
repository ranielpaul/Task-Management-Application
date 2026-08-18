import { useState } from 'react';

export function useTaskFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  function searchTasks(nextSearchTerm) {
    setSearchTerm(nextSearchTerm);
  }

  function applySearch() {
    setAppliedSearchTerm(searchTerm);
  }

  function filterByStatus(nextStatus) {
    setSelectedStatus(nextStatus);
  }

  const filters = {
    search: appliedSearchTerm || undefined,
    status: selectedStatus,
  };

  return {
    searchTerm,
    appliedSearchTerm,
    selectedStatus,
    filters,
    searchTasks,
    applySearch,
    filterByStatus,
  };
}

export default useTaskFilters;
