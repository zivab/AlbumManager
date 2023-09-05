import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Photo, AlbumState, PhotoUpdate } from '../../app/types';

const initialState: AlbumState = {
  albumData: [],
  currentAlbumId: 1,
  modalIsOpen: false,
  currentPhotoData: [],
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    updateCurrentAlbumId: (state, action: PayloadAction<number>) => {
      state.currentAlbumId = action.payload;
    },
    updateCurrentAlbumData: (state, action: PayloadAction<Photo[]>) => {
      state.albumData = action.payload;
    },
    updateModalStatus: (state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload;
    },
    updateCurrentPhotoData: (state, action: PayloadAction<Photo>) => {
      state.currentPhotoData = action.payload;
    },
    deletePhoto: (state, action: PayloadAction<number>) => {
      state.albumData = state.albumData.filter(
        (photo) => photo.id !== action.payload
      );
    },
    updatePhoto: (state, action: PayloadAction<PhotoUpdate>) => {
      state.albumData = state.albumData.map((photo) => {
        if (photo.id === action.payload.id) {
          return {
            ...photo,
            title: action.payload.title,
            thumbnailUrl: action.payload.thumbnailUrl,
            url: action.payload.thumbnailUrl,
          };
        }
        return photo;
      });
    },
    uploadPhoto: (state, action: PayloadAction<Photo>) => {
      state.albumData = [{ ...action.payload }, ...state.albumData];
    },
  },
});

export const {
  updateCurrentAlbumId,
  updateCurrentAlbumData,
  updateModalStatus,
  updateCurrentPhotoData,
  deletePhoto,
  updatePhoto,
  uploadPhoto,
} = albumSlice.actions;

export const selectCurrentAlbumData = (state: RootState): Photo[] | [] =>
  state.album.albumData;
export const selectCurrentAlbumId = (state: RootState): number =>
  state.album.currentAlbumId;
export const selectCurrentPhotoData = (state: RootState): Photo | object =>
  state.album.currentPhotoData;
export const selectModalStatus = (state: RootState): boolean =>
  state.album.modalIsOpen;

export default albumSlice.reducer;
