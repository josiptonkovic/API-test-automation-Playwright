import { APIRequestContext, APIResponse } from '@playwright/test';

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  data?: any;
}

export async function sendRequest(
  request: APIRequestContext,
  options: RequestOptions
): Promise<APIResponse> {
  const { method, url, headers = {}, data } = options;

  switch (method) {
    case 'GET':
      return await request.get(url, { headers });
    case 'POST':
      return await request.post(url, { headers, data });
    case 'PUT':
      return await request.put(url, { headers, data });
    case 'DELETE':
      return await request.delete(url, { headers });
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}
