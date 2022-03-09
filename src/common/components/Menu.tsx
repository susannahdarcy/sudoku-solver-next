import React from 'react';

type IMenu = {
  setShowMenu: Function;
  showMenu: boolean;
};

const Menu = ({ setShowMenu, showMenu }: IMenu) => {
  return (
    <div className="h-full bg-gray-800 text-white">
      <button
        type="button"
        onClick={() => {
          setShowMenu(true);
        }}
      >
        =
      </button>
      {showMenu && (
        <div>
          <div>hi</div>
          <button
            type="button"
            onClick={() => {
              setShowMenu(false);
            }}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};

export { Menu };
