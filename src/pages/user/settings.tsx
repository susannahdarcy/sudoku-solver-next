import React, { ChangeEvent } from 'react';

import { withPageAuthRequired, getSession, useUser } from '@auth0/nextjs-auth0';

import { userSettingsFetch } from '@/../utils/connections';
import dbConnect from '@/../utils/dbConnect';
import { Toggle } from '@/common/components/Form';
import {
  SettingElement,
  SettingNavBar,
  SettingPageType,
  SettingSection,
} from '@/common/components/Settings';
import { Meta } from '@/common/layout/Meta';
import { Main } from '@/common/templates/Main';
import UserSettings from '@/models/UserSettings';
import {
  SettingContext,
  defaultSettings,
} from '@/modules/settings/context/SettingContext';

interface ISettingProps {
  userSettingsData: string;
}

const Settings = ({ userSettingsData }: ISettingProps) => {
  const savedUserData = JSON.parse(userSettingsData);
  const { user } = useUser();

  const [settings, setSettings] = React.useState(savedUserData.userSettings);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.target) {
      const { checked } = event.target;
      setSettings({
        ...settings,
        [event.target.name]: checked,
      });
    }
  };

  const [currentSettingPage, setCurrentSettingPage] = React.useState(
    SettingPageType.GAME
  );

  // const saveSettingsToLocalStorage = () => {
  //   localStorage.setItem('sudokuSettings', JSON.stringify(settings));
  // };

  const handleSaveSettings = async () => {
    const userSettings = {
      _id: user?.sub,
      userSettings: settings,
    };

    console.log(JSON.stringify(userSettings));

    if (savedUserData._id) {
      // Update Settings DB
      try {
        await userSettingsFetch(
          `api/userSettings/${user?.sub}`,
          'PUT',
          JSON.stringify(userSettings)
        );
      } catch (error) {
        console.log(error);
      }
      // Create Settings Entry
    } else if (user && user.sub) {
      try {
        await userSettingsFetch(
          'api/userSettings',
          'POST',
          JSON.stringify(userSettings)
        );
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
              <SettingContext.Provider value={settings.hasSolvingAnimation}>
                <Toggle
                  toggleTitle="Solving Animation"
                  toggleDescription="Turn on to show the solving process for the Sudoku Solve"
                  handleChange={handleToggleChange}
                  settingOption="hasSolvingAnimation"
                  checked={settings.hasSolvingAnimation}
                />
              </SettingContext.Provider>
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
    let data = JSON.stringify({ userSettings: defaultSettings });

    if (auth0User?.user) {
      const id = auth0User?.user.sub;
      try {
        // Connect to mongodb, and get user settings.
        dbConnect();
        const user = await UserSettings.findById(id);

        if (user) data = JSON.stringify(user);
      } catch (error) {
        console.log(error);
      }
    }

    return {
      props: {
        userSettingsData: data,
      },
    };
  },
});
