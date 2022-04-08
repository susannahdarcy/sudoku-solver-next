import mongoose, { ConnectionStates } from 'mongoose';

let isConnected: ConnectionStates;

const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI!);
  isConnected = db.connections[0]!.readyState;
};

export default dbConnect;
