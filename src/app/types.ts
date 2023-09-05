export type Photo = {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
  isEditing?: boolean;
};

export interface AlbumState {
  albumData: Photo[] | [];
  currentAlbumId: number;
  modalIsOpen: boolean;
  currentPhotoData: Photo | object;
}

export type PhotoUpdate = {
  id: number;
  title: string;
  thumbnailUrl: string;
};
