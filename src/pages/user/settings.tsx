import React, { ChangeEvent } from 'react';

import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

import { Toggle } from '@/common/components/Form';
import {
  SettingElement,
  SettingNavBar,
  SettingPageType,
  SettingSection,
} from '@/common/components/Settings';
import { Meta } from '@/common/layout/Meta';
import { Main } from '@/common/templates/Main';
import { IUserSettings } from '@/models/IUserSettings';
import UserSettings from '@/models/UserSettings';
import { SudokuDifficulty } from '@/modules/sudoku/utils/Sudoku';

import dbConnect from '../../../utils/dbConnect';

interface ISettingProps {
  userSettingsData: string;
}

const Settings = ({ userSettingsData }: ISettingProps) => {
  const savedUserData = JSON.parse(userSettingsData);

  const initialSettings: IUserSettings = savedUserData ?? {
    _id: '',
    hasSolvingAnimation: true,
    sudokuDifficulty: SudokuDifficulty.EASY,
  };

  const [settings, setSettings] = React.useState(initialSettings);

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

  const handleSaveSettings = async () => {
    if (savedUserData) {
      // Update Settings DB
      try {
        await fetch(
          `http://localhost:3000/api/userSettings/${savedUserData._id}`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
          }
        );
      } catch (error) {
        console.log(error);
      }
      // Create Settings Entry
    } else {
      try {
        await fetch('http://localhost:3000/api/userSettings', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                checked={settings.hasSolvingAnimation}
              />
            </SettingElement>
          </SettingSection>
        )}
        <div>
          <button onClick={handleSaveSettings}>Save</button>
        </div>
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

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);
    let data = {};
    // console.log(auth0User?.user);
    if (auth0User?.user) {
      const id = auth0User?.user.sub;

      // Connect to mongodb, and get user settings.
      dbConnect();
      const user = await UserSettings.findById(id);

      data = JSON.stringify(user);
    }

    return {
      props: {
        userSettingsData: data,
      },
    };
  },
});
