interface ErrorObject {
  status?: number | string;
  message?: string;
  data?: unknown;
  error?: string;
  response?: {
    data?: unknown;
    status?: number;
    statusText?: string;
  };
}

interface MetaData {
  response?: {
    status?: number;
    statusText?: string;
  };
}

interface TransformedResponse {
  error: number | string;
  message: string;
  details: unknown;
  timestamp: string;
}

const transformErrorResponse = (
  error: ErrorObject,
  meta?: MetaData
): TransformedResponse => {
  const status =
    meta?.response?.status ??
    (typeof error?.status === 'number' ? error.status : 500);

  const statusText =
    meta?.response?.statusText ||
    error?.message ||
    error?.error ||
    'Unknown error';

  return {
    error: error?.status || status,
    message: statusText,
    details: error?.data || error?.response?.data || null,
    timestamp: new Date().toISOString(),
  };
};

export default transformErrorResponse;
