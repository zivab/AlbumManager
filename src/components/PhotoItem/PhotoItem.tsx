import React, { useState, useRef } from 'react';
import MenuDropdown from './MenuDropdown/MenuDropdown';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '../../app/hooks';
import { Photo } from '../../app/types';
import { useUpdatePhotoMutation } from '../../features/album/albumAPI';
import { updatePhoto as updatePhototoLocally } from '../../features/album/albumSlice';
import { motion } from 'framer-motion';

import {
  updateModalStatus,
  updateCurrentPhotoData,
} from '../../features/album/albumSlice';

const PhotoItem = ({
  albumId,
  id,
  title,
  thumbnailUrl,
  url,
  isEditing,
}: Photo) => {
  const [isEditingCurrent, setIsEditingCurrent] = useState<boolean | undefined>(
    isEditing
  );

  const [updatePhoto] = useUpdatePhotoMutation();

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const modalHandler = () => {
    if (!isEditingCurrent) {
      dispatch(updateModalStatus(true));
      dispatch(
        updateCurrentPhotoData({
          albumId,
          id,
          title,
          thumbnailUrl,
          url,
          isEditing,
        })
      );
    }
  };

  const updatePhotoData = (id: number) => {
    const newTitle = titleRef?.current?.value || title;
    const newThumbnailUrl = imageRef?.current?.value || thumbnailUrl;
    if (newTitle !== title || newThumbnailUrl !== thumbnailUrl) {
      updatePhoto({
        id,
        title: newTitle,
        thumbnailUrl: newThumbnailUrl,
      });
      dispatch(
        updatePhototoLocally({
          id,
          title: newTitle,
          thumbnailUrl: newThumbnailUrl,
        })
      );
    }

    setIsEditingCurrent(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="card-wrapper flex flex-col items-center h-80 w-100 bg-gradient-to-tl from-[#3e93a7] to-[#88e9ff]/50 rounded-2xl my-10 mx-4 hover:bg-[#b8e6f0] hover:shadow-[#b8e6f0]/70 hover:cursor-pointer hover:translate-y-1 shadow-xl p-10 font-roboto font-light relative justify-center"
      key={id}
      onClick={modalHandler}
    >
      <MenuDropdown id={id} setIsEditingCurrent={setIsEditingCurrent} />
      {isEditingCurrent ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <h3 className="block text-sm font-bold leading-6 text-white font-roboto mb-2">
            Photo Title:
          </h3>
          <input
            className="text-sm block w-full rounded-2xl border-0 py-1.5 pl-2 pr-2 text-white/90 font-normal ring-1 ring-inset ring-gray-300 placeholder:text-white/60 placeholder:font-medium focus:ring-2 outline-[#88e9ff] focus:ring-inset focus:ring-[#88e9ff] sm:text-sm sm:leading-6 bg-[#88e9ff]/70 mb-6"
            placeholder={title}
            ref={titleRef}
          />
          <h3 className="block text-sm font-bold leading-6 text-white font-roboto mb-2">
            Photo URL:
          </h3>
          <input
            className="text-sm block w-full rounded-2xl border-0 py-1.5 pl-2 pr-2 text-white/90 font-normal ring-1 ring-inset ring-gray-300 placeholder:text-white/60 placeholder:font-medium focus:ring-2 outline-[#88e9ff] focus:ring-inset focus:ring-[#88e9ff] sm:text-sm sm:leading-6 bg-[#88e9ff]/70 mb-6"
            placeholder={thumbnailUrl}
            ref={imageRef}
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-white flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#88e9ff]/50 to-[#88e9ff]/70 px-3.5 py-1.5 text-sm font-bold font-roboto hover:bg-[#88e9ff] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg hover:shadow-[#73f7f3]/50"
              onClick={() => updatePhotoData(id)}
            >
              <CheckCircleIcon className="h-6" />
              Save
            </button>
            <button
              type="submit"
              className="text-white flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#88e9ff]/50 to-[#88e9ff]/70 px-3.5 py-1.5 text-sm font-bold font-roboto hover:bg-[#88e9ff] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg hover:shadow-[#73f7f3]/50"
              onClick={() => setIsEditingCurrent(false)}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="card text-[#e9fafa] text-sm text-center mb-10 truncate w-full">
            {title}
          </div>
          {thumbnailUrl ? (
            <img src={thumbnailUrl} className="rounded-xl w-auto h-[150px]" />
          ) : (
            <div className="flex items-center justify-center text-white/80 w-[150px] h-[150px] bg-[#73f7f3]/50 rounded-xl">
              <div>No image</div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default PhotoItem;
