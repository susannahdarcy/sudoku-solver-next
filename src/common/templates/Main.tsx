import React, { ReactNode } from 'react';

import { AppConfig } from '@/common/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  // const [showMenu, setShowMenu] = useState(true);

  return (
    <div className="px-1 w-full antialiased text-gray-700">
      {props.meta}

      {/* <Menu setShowMenu={setShowMenu} showMenu={showMenu} /> */}

      <div className="flex flex-col justify-center items-center">
        <div className="py-10 px-2 w-full sm:p-10">
          <h1 className="place-self-start pl-4 font-mono text-4xl font-black text-center overline sm:place-self-center">
            {AppConfig.title}
          </h1>
        </div>

        {props.children}

        <div className="py-8 w-8/12 text-sm text-center border-t border-gray-300">
          {/* © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '} */}
          {/* <span role="img" aria-label="Love"> */}
          {/*  ♥ */}
          {/* </span>{' '} */}
          {/* by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a> */}
          {/* /!* */}
          {/* * PLEASE READ THIS SECTION */}
          {/* * We'll really appreciate if you could have a link to our website */}
          {/* * The link doesn't need to appear on every pages, one link on one page is enough. */}
          {/* * Thank you for your support it'll mean a lot for us. */}
          {/* *!/ */}
          Created by Susannah - © Copyright Subo Inc.
        </div>
      </div>
    </div>
  );
};

export { Main };
