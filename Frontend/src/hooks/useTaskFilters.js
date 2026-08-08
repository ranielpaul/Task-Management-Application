import { useState } from 'react';

export function useTaskFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  function searchTasks(nextSearchTerm) {
    setSearchTerm(nextSearchTerm);
  }

  function applySearch() {
    setAppliedSearchTerm(searchTerm);
  }

  function filterByState(nextState) {
    setSelectedState(nextState);
  }

  function filterByStatus(nextStatus) {
    setSelectedStatus(nextStatus);
  }

  const filters = {
    search: appliedSearchTerm || undefined,
    state: selectedState,
    status: selectedStatus,
  };

  return {
    searchTerm,
    appliedSearchTerm,
    selectedState,
    selectedStatus,
    filters,
    searchTasks,
    applySearch,
    filterByState,
    filterByStatus,
  };
}

export default useTaskFilters;
