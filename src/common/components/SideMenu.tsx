import React from 'react';

import Link from 'next/link';

import { GoBackButton } from '@/common/components/SidePage';
import { SignUpButton } from '@/modules/userAuth/LoginButton';

type IMenu = {
  setShowMenu: Function;
  showMenu: boolean;
};

const SideMenu = ({ setShowMenu, showMenu }: IMenu) => {
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-100 h-full text-white bg-gray-800 rounded-r-lg">
      <div className="p-10">
        <button onClick={toggleMenu}>x</button>
        <GoBackButton />
        <SignUpButton />
        <Link href="/user/settings">
          <a>settings</a>
        </Link>
      </div>
    </div>
  );
};

export { SideMenu };
