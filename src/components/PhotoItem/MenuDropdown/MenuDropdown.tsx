import React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useDeletePhotoMutation } from '../../../features/album/albumAPI';
import { useAppDispatch } from '../../../app/hooks';
import { deletePhoto as deletePhotoLocally } from '../../../features/album/albumSlice';
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';

type Props = {
  id: number;
  setIsEditingCurrent: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
};

export default function MenuDropDown({ id, setIsEditingCurrent }: Props) {
  const dispatch = useAppDispatch();
  const [deletePhoto] = useDeletePhotoMutation();
  const handleOptionsButtonClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  const deletePhotoHandler = (photoId: number) => {
    dispatch(deletePhotoLocally(photoId));
    deletePhoto(photoId);
  };

  const editPhotoHandler = () => {
    // console.log('editing photo id:', id);
    setIsEditingCurrent(true);
    // dispatch(deletePhotoLocally(photoId));
    // deletePhoto(photoId);
  };

  return (
    <div onClick={handleOptionsButtonClick}>
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button>
            <div className="hover:shadow-xl hover:shadow-[#73f7f3] border-sky-800 bg-white rounded-full absolute left-4 top-4 p-1">
              <EllipsisVerticalIcon
                className="h-6 w-6 text-gray-400 hover:text-sky-300"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-[#ebf9fc] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none absolute left-4 top-10">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#77d5eb] text-white' : 'text-[#63b3c5]'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                    onClick={editPhotoHandler}
                  >
                    <PencilSquareIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Edit
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#77d5eb] text-red-400' : 'text-[#63b3c5]'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                    onClick={() => deletePhotoHandler(id)}
                  >
                    <TrashIcon
                      className="mr-2 h-5 w-5 hover:text-red-400"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
