export const request = async ({ url, method = 'GET', body = null, headers = {} }: { url: string, method?: string, body?: any, headers?: any }) => {
  const defaultHeaders: any = {};
  
  // Only set Content-Type to application/json if body is not FormData
  if (!(body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
    defaultHeaders['Accept'] = 'application/json';
  }

  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    defaultHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  const mergedHeaders = { ...defaultHeaders, ...headers };

  const fetchOptions: RequestInit = {
    method,
    headers: mergedHeaders,
    body: (body && method !== 'GET' && method !== 'HEAD') ? (body instanceof FormData ? body : JSON.stringify(body)) : null,
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Network response was not ok: ${errorBody}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
