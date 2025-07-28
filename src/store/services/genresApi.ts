import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../api/url';

export const genresApi = createApi({
  reducerPath: 'genresApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getGenres: builder.query<string[], void>({
      query: () => 'genres',
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
