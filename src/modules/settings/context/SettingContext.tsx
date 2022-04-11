import React from 'react';

import { ISettingsSchema } from '@/models/IUserSettingsSchema';
import { SudokuDifficulty } from '@/modules/sudoku/utils/Sudoku';

const defaultSettings: ISettingsSchema = {
  hasSolvingAnimation: true,
  sudokuDifficulty: SudokuDifficulty.EASY,
};

const SettingContext = React.createContext(defaultSettings);

export { defaultSettings, SettingContext };
