import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PhotosList from '../components/PhotosList/PhotosList';
import PhotoItem from '../components/PhotoItem/PhotoItem';
import Dropdown from '../components/Dropdown/Dropdown';
import Modal from '../components/Modal/Modal';
import Loading from '../components/Loading/Loading';
import ErrorModal from '../components/ErrorModal/ErrorModal';
import { Photo } from '../app/types';
import UploadForm from '../components/UploadForm/UploadForm';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import {
  selectCurrentAlbumId,
  updateCurrentAlbumData,
  selectCurrentAlbumData,
} from '../features/album/albumSlice';
import { useGetPhotosByAlbumIdQuery } from '../features/album/albumAPI';

const Main = () => {
  const albumId = useAppSelector(selectCurrentAlbumId);
  const photos = useAppSelector(selectCurrentAlbumData);

  const [openUploadForm, setOpenUploadForm] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    data: photosFromQuery,
    isFetching,
    isError,
  } = useGetPhotosByAlbumIdQuery(albumId);

  useEffect(() => {
    if (photosFromQuery) {
      dispatch(updateCurrentAlbumData(photosFromQuery));
    }
  }, [dispatch, photosFromQuery]);

  const UploadButton = () => (
    <button
      type="button"
      className="text-white flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#88e9ff]/50 to-[#88e9ff]/70 px-3.5 py-1.5 text-sm font-bold font-roboto hover:bg-[#88e9ff] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg hover:shadow-[#73f7f3]/50 mb-5"
      onClick={() => setOpenUploadForm(true)}
    >
      <ArrowUpTrayIcon className="h-6" />
      Upload new photo
    </button>
  );

  return (
    <Layout>
      <Header title="Album Manager" />
      <Dropdown />
      {openUploadForm && (
        <UploadForm isOpen={openUploadForm} setOpen={setOpenUploadForm} />
      )}
      <UploadButton />
      <Modal />
      {isFetching && <Loading />}
      {isError && <ErrorModal />}
      <PhotosList>
        {photos &&
          !isFetching &&
          photos.map((photo: Photo) => {
            return <PhotoItem key={photo.id} {...photo} isEditing={false} />;
          })}
      </PhotosList>
    </Layout>
  );
};

export default Main;
