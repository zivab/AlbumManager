import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="wrapper flex flex-col justify-center items-center w-screen h-full my-10 px-10">
      {children}
    </div>
  );
};

export default Layout;
