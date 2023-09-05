import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Photo } from '../../app/types';
import {
  updateModalStatus,
  selectModalStatus,
  selectCurrentPhotoData,
} from '../../features/album/albumSlice';

export default function Modal() {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(selectModalStatus);
  const { title, url }: Photo | any = useAppSelector(selectCurrentPhotoData);

  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(updateModalStatus(false))}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex flex-col md:flex-row min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full justify-center transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex items-center overflow-hidden bg-white/90 px-4 pb-8 pt-14 shadow-2xl sm:px-6  rounded-xl">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                    onClick={() => dispatch(updateModalStatus(false))}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full items-start">
                    <div className="mb-4">
                      <h2 className="text-xl font-light text-gray-600 sm:pr-12">
                        {title}
                      </h2>
                    </div>
                    <div className="rounded-lg flex justify-center">
                      <img
                        src={url}
                        alt={title}
                        loading="lazy"
                        className="object-cover object-center rounded-xl"
                      />
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
