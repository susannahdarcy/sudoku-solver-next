import React from 'react';

import clsx from 'clsx';
import { map } from 'lodash-es';

import { SudokuDifficulty } from '@/modules/sudoku/utils/Sudoku';

enum SettingPageType {
  DISPLAY = 'Display',
  USER = 'User',
  GAME = 'Game',
}

type ISettingNavBar = {
  currentSettingPage: SettingPageType;
  setCurrentSettingPage: Function;
};

const SettingNavBar: React.FC<ISettingNavBar> = ({
  currentSettingPage,
  setCurrentSettingPage,
}: ISettingNavBar) => {
  const allSettings: SettingPageType[] = [
    SettingPageType.GAME,
    SettingPageType.USER,
    SettingPageType.DISPLAY,
  ];

  const onNavChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
    setCurrentSettingPage(event.currentTarget.value);
  };

  return (
    <div className="flex flex-row gap-10 place-items-start pt-4 text-gray-400 border-b">
      {map(allSettings, (setting) => {
        const isSelected = currentSettingPage === setting;
        const style = clsx(
          'py-3 px-1 font-bold text-left hover:text-gray-600',
          isSelected && 'text-blue-700 border-b-2 border-b-blue-700'
        );
        return (
          <div key={setting}>
            <button className={style} value={setting} onClick={onNavChange}>
              <div>{setting}</div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

type ISettingPage = {
  title: string;
  subTitle?: string;
};

const SettingSection: React.FC<ISettingPage> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <div className="py-4">
      <div className="py-4">
        <h1 className="text-xl font-bold">{title}</h1>

        {subTitle && <div className="text-gray-400">{subTitle}</div>}
      </div>

      <div>{children}</div>
    </div>
  );
};

const SettingElement: React.FC = ({ children }) => {
  return <div className="py-6 border-y border-gray-500/20">{children}</div>;
};

enum SettingOptions {
  SolvingAnimation = 'hasSolvingAnimation',
  SudokuDiff = 'sudokuDifficulty',
}

type ISettingOptions = {
  hasSolvingAnimation: boolean;
  sudokuDifficulty: SudokuDifficulty;
};

export {
  SettingNavBar,
  SettingPageType,
  SettingSection,
  SettingElement,
  SettingOptions,
};

export type { ISettingOptions };
