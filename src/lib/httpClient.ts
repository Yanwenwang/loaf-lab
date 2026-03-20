type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';

const withApiBase = (url: string) => {
  if (!API_BASE_URL || /^https?:\/\//.test(url)) {
    return url;
  }

  return `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

export const request = async (url: string, options: RequestOptions = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  const response = await fetch(withApiBase(url), {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) {
        message = data.error;
      }
    } catch {
      // ignore json parse errors and keep generic message
    }

    throw new Error(message);
  }

  return response;
};

export const httpClient = {
  request,
  post: (url: string, body?: unknown, headers?: Record<string, string>) => request(url, { method: 'POST', body, headers }),
};
