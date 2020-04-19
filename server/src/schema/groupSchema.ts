import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  groupname: String,
  members: [String],
  messages: [{ username: String, timestamp: Date, message: String }]
});