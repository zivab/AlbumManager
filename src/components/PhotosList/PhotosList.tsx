import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PhotosList = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-auto-fill h-full w-full bg-[#50c6e1] rounded-xl shadow-xl">
      {children}
    </div>
  );
};

export default PhotosList;
