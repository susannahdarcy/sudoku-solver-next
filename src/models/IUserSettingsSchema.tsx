interface IUserSettingsSchema {
  _id: string;
  sudokuGameSettings: ISudokuGameSettingsSchema;
}

interface ISudokuGameSettingsSchema {
  hasSolvingAnimation: boolean;
  sudokuDifficulty: string;
}

export type { IUserSettingsSchema, ISudokuGameSettingsSchema };
