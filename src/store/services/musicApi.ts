import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Track, TrackListResponse } from "../../types/track";
import { BASE_URL } from "../../api/url";

export interface GetTracksParams {
  page?: number;
  limit?: number;
  sort?: 'title' | 'artist' | 'album' | 'createdAt';
  order?: 'asc' | 'desc';
  search?: string;
  genre?: string | string[];
  artist?: string;
}

export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Tracks", "Track"],
  endpoints: (builder) => ({
    getTracks: builder.query<TrackListResponse, GetTracksParams>({
      query: (params = {}) => ({
        url: 'tracks',
        params, 
      }),
      providesTags: ['Tracks'],
    }),

    uploadTrackFile: builder.mutation<Track, { id: string; file: File }>({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('file', file);
    
        return {
          url: `tracks/${id}/upload`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Tracks'],
    }),    

    deleteTrack: builder.mutation<void, string>({
      query: (id) => ({
        url: `tracks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tracks'],
    }),
    
    createTrack: builder.mutation<Track, Partial<Track>>({
      query: (newTrack) => ({
        url: 'tracks',
        method: 'POST',
        body: newTrack,
      }),
      invalidatesTags: ['Tracks'],
    }),

    updateTrack: builder.mutation<Track, { id: string; data: Partial<Track> }>({
      query: ({ id, data }) => ({
        url: `tracks/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tracks'],
    }),
    
    getTrackBySlug: builder.query<Track, string>({
      query: (slug) => `tracks/${slug}`,
      providesTags: ['Track'],
    }),
    
  }),
});

export const { 
  useLazyGetTracksQuery,
  useUploadTrackFileMutation,
  useDeleteTrackMutation, 
  useCreateTrackMutation,
  useUpdateTrackMutation,
  useLazyGetTrackBySlugQuery
} = musicApi;
