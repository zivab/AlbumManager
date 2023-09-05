import React from 'react';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="text-4xl font-normal font-roboto mb-10 text-transparent bg-clip-text bg-gradient-to-tl from-sky-300 to-slate-100">
      {title}
    </div>
  );
};

export default Header;
