import { NextApiRequest, NextApiResponse } from 'next';

import UserSettings from '@/models/UserSettings';

import dbConnect from '../../../../utils/dbConnect';

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await UserSettings.find({});

        res.status(200).json({
          success: true,
          data: users,
        });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to get all' });
      }
      break;

    case 'POST':
      try {
        const user = await UserSettings.create(req.body);

        res.status(201).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: false, error: 'method not handled: default' });
      break;
  }
};
