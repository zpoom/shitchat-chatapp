import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  groupname: { type: String, unique: true },
  members: [String],
  messages: [{ username: String, timestamp: Date, message: String }]
});