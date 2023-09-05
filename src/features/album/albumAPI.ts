import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PhotoUpdate, Photo } from '../../app/types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getPhotosByAlbumId: builder.query({
      query: (albumId: number) => `photos?albumId=${albumId}`,
    }),
    updatePhoto: builder.mutation({
      query: ({ id, title, thumbnailUrl }: PhotoUpdate) => ({
        url: `photos/${id}`,
        method: 'PUT',
        body: { title, thumbnailUrl },
      }),
    }),
    deletePhoto: builder.mutation({
      query: (id: number) => ({
        url: `photos/${id}`,
        method: 'DELETE',
      }),
    }),
    addPhoto: builder.mutation({
      query: (newPhoto: Photo) => ({
        url: 'photos',
        method: 'POST',
        body: newPhoto,
      }),
    }),
  }),
});

export const {
  useGetPhotosByAlbumIdQuery,
  useAddPhotoMutation,
  useUpdatePhotoMutation,
  useDeletePhotoMutation,
} = api;
