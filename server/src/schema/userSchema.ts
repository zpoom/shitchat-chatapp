import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  latestReadTime: [{ groupId: mongoose.Schema.Types.ObjectId, timestamp: Date }]
});