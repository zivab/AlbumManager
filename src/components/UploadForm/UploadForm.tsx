import React from 'react';
import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAddPhotoMutation } from '../../features/album/albumAPI';
import {
  uploadPhoto as uploadPhotoLocally,
  selectCurrentAlbumId,
} from '../../features/album/albumSlice';

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

let nextId = 301;

export default function UploadForm({ isOpen: open, setOpen }: Props) {
  const [uploadPhotoData] = useAddPhotoMutation();
  const albumId = useAppSelector(selectCurrentAlbumId);
  const dispatch = useAppDispatch();
  const cancelButtonRef = useRef(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const uploadPhoto = () => {
    const photoTitle: string | undefined = titleRef?.current?.value.trim();
    const imageURL: string | undefined = imageRef?.current?.value.trim();

    if (!photoTitle || !imageURL) {
      return setCanSubmit(false);
    }
    setCanSubmit(true);

    if (canSubmit && photoTitle && imageURL) {
      const uploadData = {
        id: nextId++,
        albumId,
        title: photoTitle,
        thumbnailUrl: imageURL,
        url: imageURL,
      };

      uploadPhotoData(uploadData);
      dispatch(uploadPhotoLocally(uploadData));
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                <div className="bg-gradient-to-tr from-[#ffffff] to-[#88e9ff]/30 px-20 py-10">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="flex justify-center mb-4 ">
                    <div className="mt-3 text-left sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-[#88e9ff] mb-2"
                      >
                        Upload a new photo:
                      </Dialog.Title>
                      <p className="text-sm text-gray-400 mb-5">
                        Fill in the following inputs in order to uoload a new
                        photo to the album
                      </p>
                      {!canSubmit && (
                        <p className="text-sm text-red-400 mb-2">
                          Title and URL inputs cannot be empty.
                        </p>
                      )}
                      <div className="w-full">
                        <h3 className="block text-sm font-medium leading-6 text-[#88e9ff] font-roboto mb-1">
                          Photo Title:
                        </h3>
                        <input
                          className="text-sm block w-full rounded-2xl border-0 py-1.5 pl-2 pr-2 text-[#4ddeff] font-medium ring-1 ring-inset ring-gray-300 placeholder:text-[#77c6d7]/60 placeholder:font-normal focus:ring-2 outline-[#88e9ff] focus:ring-inset focus:ring-[#88e9ff] sm:text-sm sm:leading-6 bg-[#88e9ff]/30 mb-6"
                          placeholder="Enter a photo title here"
                          ref={titleRef}
                        />

                        <h3 className="block text-sm font-medium leading-6 text-[#88e9ff] font-roboto mb-1">
                          Photo URL:
                        </h3>
                        <input
                          className="text-sm block w-full rounded-2xl border-0 py-1.5 pl-2 pr-2 text-[#4ddeff] font-medium ring-1 ring-inset ring-gray-300 placeholder:text-[#77c6d7]/60  placeholder:font-normal focus:ring-2 outline-[#88e9ff] focus:ring-inset focus:ring-[#88e9ff] sm:text-sm sm:leading-6 bg-[#88e9ff]/30 mb-8"
                          placeholder="Enter a photo URL here"
                          ref={imageRef}
                        />
                        <div className="flex gap-4">
                          <button
                            type="submit"
                            className="text-white flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#88e9ff]/80 to-[#88e9ff]/90 px-3.5 py-1.5 text-sm font-bold font-roboto hover:bg-[#88e9ff] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg hover:shadow-[#73f7f3]/50"
                            onClick={uploadPhoto}
                          >
                            <ArrowUpTrayIcon className="h-6" />
                            Upload
                          </button>
                          <button
                            type="button"
                            className="text-white flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#88e9ff]/80 to-[#88e9ff]/90 px-3.5 py-1.5 text-sm font-bold font-roboto hover:bg-[#88e9ff] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg hover:shadow-[#73f7f3]/50"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
