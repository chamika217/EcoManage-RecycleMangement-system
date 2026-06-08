const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  return res.json();
}

// Public
export const getRequests    = ()    => request('/requests');
export const getRequestById = (id)  => request(`/requests/${id}`);
export const createRequest  = (data)=> request('/requests', { method: 'POST', body: JSON.stringify(data) });

export const getCategories  = ()    => request('/categories');
export const getSchedules   = ()    => request('/schedules');
export const getReports     = ()    => request('/reports');

export const createContact  = (data)=> request('/contact', { method: 'POST', body: JSON.stringify(data) });

// Admin - Auth
export const login = (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) });

// Admin - Requests
export const updateRequest = (id, data) => request(`/requests/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteRequest = (id)       => request(`/requests/${id}`, { method: 'DELETE' });

// Admin - Categories
export const createCategory = (data)      => request('/categories', { method: 'POST', body: JSON.stringify(data) });
export const updateCategory = (id, data)  => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCategory = (id)        => request(`/categories/${id}`, { method: 'DELETE' });

// Admin - Teams
export const getTeams      = ()           => request('/teams');
export const createTeam    = (data)       => request('/teams', { method: 'POST', body: JSON.stringify(data) });
export const updateTeam    = (id, data)   => request(`/teams/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTeam    = (id)         => request(`/teams/${id}`, { method: 'DELETE' });

// Admin - Schedules
export const createSchedule = (data)     => request('/schedules', { method: 'POST', body: JSON.stringify(data) });
export const updateSchedule = (id, data) => request(`/schedules/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteSchedule = (id)       => request(`/schedules/${id}`, { method: 'DELETE' });

// Admin - Messages
export const getMessages    = ()         => request('/contact');
export const updateMessage  = (id, data) => request(`/contact/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteMessage  = (id)       => request(`/contact/${id}`, { method: 'DELETE' });
