import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string => {
  if ('status' in error) {
    const err = error as FetchBaseQueryError;
    return `Error ${err.status}: ${
      err.data && typeof err.data === 'object' && 'message' in err.data
        ? (err.data as any).message
        : 'An error occurred while fetching products.'
    }`;
  } else if ('message' in error) {
    return error.message || 'An unknown error occurred.';
  }
  return 'An unknown error occurred.';
};
