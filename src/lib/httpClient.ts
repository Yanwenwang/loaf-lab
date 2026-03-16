type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
};

export const request = async (url: string, options: RequestOptions = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  const response = await fetch(url, {
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
