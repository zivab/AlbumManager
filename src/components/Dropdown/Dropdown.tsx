import React from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '../../app/hooks';
import { updateCurrentAlbumId } from '../../features/album/albumSlice';

type Album = {
  id: number;
  title: string;
};

const album = [
  { id: 1, title: 'Album 1' },
  { id: 2, title: 'Album 2' },
  { id: 3, title: 'Album 3' },
  { id: 4, title: 'Album 4' },
  { id: 5, title: 'Album 5' },
  { id: 6, title: 'Album 6' },
];

export default function Dropdown() {
  const [selected, setSelected] = useState(album[0]);

  const dispatch = useAppDispatch();

  const selectAlbumHandler = (albumEntity: Album) => {
    setSelected(albumEntity);
    dispatch(updateCurrentAlbumId(albumEntity.id));
  };

  return (
    <div className="mb-5 w-72 z-10 font-roboto">
      <h3 className="text-white font-light">Selected Album:</h3>
      <Listbox value={selected} onChange={selectAlbumHandler}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#ebf9fc] py-2 pl-3 pr-10 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block truncate text-[#63b3c5]">
              {selected.title}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-[#ebf9fc] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {album.map((album, albumIdx) => (
                <Listbox.Option
                  key={albumIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-[#77d5eb] text-white ' : 'text-[#63b3c5]'
                    }`
                  }
                  value={album}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {album.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#5598a8]">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
