import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import UserSettings from '@/models/UserSettings';

import dbConnect from '../../../../utils/dbConnect';

dbConnect();

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const {
      query: { id },
      method,
    } = req;

    const session = getSession(req, res);
    if (session) {
      const { user } = session;

      if (user.sub !== id) {
        res.status(400).json({ success: false, error: 'user not authorised' });
        return;
      }
    }

    switch (method) {
      case 'GET':
        try {
          const user = await UserSettings.findById(id);

          if (!user) {
            res
              .status(400)
              .json({ success: false, error: 'GET: user id not found' });
            return;
          }

          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false, error });
        }
        break;
      case 'PUT':
        try {
          const user = await UserSettings.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });

          if (!user) {
            res
              .status(400)
              .json({ success: false, error: 'PUT: user id not found' });
            return;
          }

          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false, error });
        }
        break;

      case 'DELETE':
        try {
          const deletedUser = await UserSettings.deleteOne({ _id: id });

          if (!deletedUser) {
            res
              .status(400)
              .json({ success: false, error: 'DELETE: user id not found' });
            return;
          }

          if (deletedUser.deletedCount === 0) {
            res.status(400).json({ success: false, error: 'No user deleted' });
            return;
          }
          res.status(200).json({ success: true, data: { deletedUser } });
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
  }
);
