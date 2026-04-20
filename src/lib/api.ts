const API_URL = 'http://localhost:3001/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Something went wrong');
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};
