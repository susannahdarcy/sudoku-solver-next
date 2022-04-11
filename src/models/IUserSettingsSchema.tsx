interface ISettingsSchema {
  hasSolvingAnimation: boolean;
  sudokuDifficulty: string;
}

interface IUserSettingsSchema {
  _id: string;
  userSettings: ISettingsSchema;
}

export type { ISettingsSchema, IUserSettingsSchema };
