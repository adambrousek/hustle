const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const libraryApi = {
  list: () => request('/library'),
  get: (id) => request(`/library/${id}`),
  create: (data) => request('/library', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/library/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/library/${id}`, { method: 'DELETE' }),
};

export const pagesApi = {
  list: () => request('/pages'),
  get: (id) => request(`/pages/${id}`),
  getBySlug: (slug) => request(`/pages/slug/${slug}`),
  create: (data) => request('/pages', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/pages/${id}`, { method: 'DELETE' }),
};

export const settingsApi = {
  get: () => request('/settings'),
  setHomepage: (pageId) =>
    request('/settings/homepage', { method: 'PUT', body: JSON.stringify({ pageId }) }),
};
