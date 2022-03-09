import React from 'react';

type IMenu = {
  setShowMenu: Function;
  showMenu: boolean;
};

const Menu = ({ setShowMenu, showMenu }: IMenu) => {
  return (
    <div>
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
