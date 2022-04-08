import { Schema, model, models, Model } from 'mongoose';

import { IUserSettings } from '@/models/IUserSettings';

const UserSettingsSchema = new Schema<IUserSettings>({
  _id: {
    type: String,
  },
  hasSolvingAnimation: {
    type: Boolean,
    default: true,
  },
  sudokuDifficulty: {
    type: String,
    default: 'easy',
  },
});

const UserSettings: Model<IUserSettings> =
  models.UserSettings || model('UserSettings', UserSettingsSchema);

export default UserSettings;
