import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import appConfig from '../../constants/appConfig';

export const baseQuery = fetchBaseQuery({
  baseUrl: appConfig.baseUrl,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
