import { Schema, model, models, Model } from 'mongoose';

import {
  ISudokuGameSettingsSchema,
  IUserSettingsSchema,
} from '@/models/IUserSettingsSchema';

const sudokuGameSettingsSchema = new Schema<ISudokuGameSettingsSchema>({
  hasSolvingAnimation: {
    type: Boolean,
    default: true,
  },
  sudokuDifficulty: {
    type: String,
    default: 'easy',
  },
});

const UserSettingsSchema = new Schema<IUserSettingsSchema>({
  _id: {
    type: String,
    required: [true, 'id is required'],
    unique: true,
  },
  sudokuGameSettings: sudokuGameSettingsSchema,
});

const UserSettings: Model<IUserSettingsSchema> =
  models.UserSettings || model('UserSettings', UserSettingsSchema);

export default UserSettings;
