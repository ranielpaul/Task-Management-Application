import axios from 'axios';

/*
  Shared Axios client.

  - Base URL comes from the VITE_API_BASE_URL env var, defaulting to the
    local FastAPI server.
  - JSON headers are set by default so task payloads are sent correctly.
  - Add interceptors or auth headers here later if needed.
*/

const baseURL = import.meta.env?.VITE_API_BASE_URL ?? 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
