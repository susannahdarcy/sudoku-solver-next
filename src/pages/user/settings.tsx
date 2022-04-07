import React, { ChangeEvent } from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { Toggle } from '@/common/components/Form';
import {
  ISettingOptions,
  SettingElement,
  SettingNavBar,
  SettingPageType,
  SettingSection,
} from '@/common/components/Settings';
import { Meta } from '@/common/layout/Meta';
import { Main } from '@/common/templates/Main';
import { SudokuDifficulty } from '@/modules/sudoku/utils/Sudoku';

const Settings = () => {
  const defaultSettings: ISettingOptions = {
    hasSolvingAnimation: true,
    sudokuDifficulty: SudokuDifficulty.EASY,
  };

  const [settings, setSettings] = React.useState(defaultSettings);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const checked = event?.target?.checked;
      setSettings({
        ...settings,
        [event.target.name]: checked,
      });
    }
  };

  const [currentSettingPage, setCurrentSettingPage] = React.useState(
    SettingPageType.GAME
  );

  return (
    <Main
      meta={
        <Meta
          title="Sudoku|Solver - Settings"
          description="Sudoku Puzzle Website, with in-built solver"
        />
      }
    >
      <div className="flex flex-col p-5 w-11/12">
        <h1 className="text-3xl font-extrabold p">Settings</h1>
        <SettingNavBar {...{ currentSettingPage, setCurrentSettingPage }} />

        {currentSettingPage === SettingPageType.GAME && (
          <SettingSection
            title="General"
            subTitle="General Settings for your Sudoku games"
          >
            <SettingElement>
              <Toggle
                toggleTitle="Solving Animation"
                toggleDescription="Turn on to show the solving process for the Sudoku Solve"
                handleChange={handleToggleChange}
                settingOption="hasSolvingAnimation"
              />
            </SettingElement>
          </SettingSection>
        )}
      </div>
    </Main>
  );
};

/**
 * User Settings:
 *  display name
 *  + general user info
 * Game Settings:
 *  auto start timer
 *  game difficulty
 * Display Settings:
 *  solving animation
 *  dark theme
 */
export default Settings;

export const getServerSideProps = withPageAuthRequired();
