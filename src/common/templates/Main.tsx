import React, { ReactNode, useState } from 'react';

import { SideMenu } from '@/common/components/SideMenu';
import { AppConfig } from '@/common/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const [showMenu, setShowMenu] = useState(true);
  return (
    <div className="overflow-hidden relative h-screen md:flex">
      {props.meta}

      <div className="hidden relative sm:flex">
        <SideMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </div>

      <div className="flex overflow-y-auto flex-col items-center w-full h-screen">
        <div className="py-10 px-2 w-full sm:p-10">
          <h1 className="place-self-start pl-4 font-mono text-4xl text-center overline sm:place-self-center font-grey-blue">
            {AppConfig.title}
          </h1>
        </div>

        {props.children}

        <div className="py-8 mt-5 w-8/12 text-sm text-center border-t border-gray-300">
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
