import { Schema, model, models, Model } from 'mongoose';

import {
  ISettingsSchema,
  IUserSettingsSchema,
} from '@/models/IUserSettingsSchema';

const SettingsSchema = new Schema<ISettingsSchema>({
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
  userSettings: SettingsSchema,
});

const UserSettings: Model<IUserSettingsSchema> =
  models.UserSettings || model('UserSettings', UserSettingsSchema);

export default UserSettings;
