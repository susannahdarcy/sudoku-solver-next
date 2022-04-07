import React from 'react';

import Link from 'next/link';

const GoBackButton = () => (
  <Link href="/">
    <a>
      <button className="flex flex-row justify-between font-mono text-grey-blue bg-white rounded-full">
        <div className="py-1 pl-4">{`<`} </div>
        <div className="py-1 px-5">go back</div>
      </button>
    </a>
  </Link>
);

const SignUp = () => (
  <div className="p-4 my-5 bg-white rounded-lg">
    <div className="pb-7 text-grey-blue">
      Sign-up to save your progress and highscores!
    </div>
    <button className="p-1 py-2 w-full tracking-wide text-center text-white uppercase bg-grey-blue rounded-full">
      Free Sign Up
    </button>
  </div>
);

const SidePage: React.FC = ({ children }) => (
  <div className="h-full text-white bg-gray-800 rounded-r-lg">
    <div className="p-10">
      <GoBackButton />
      {children}
    </div>
  </div>
);

export { SidePage, GoBackButton, SignUp };
