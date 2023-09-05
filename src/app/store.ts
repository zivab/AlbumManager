import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from '../features/album/albumAPI';
import albumSliceReducer from '../features/album/albumSlice';

export const store = configureStore({
  reducer: {
    album: albumSliceReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
