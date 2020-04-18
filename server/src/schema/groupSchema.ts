import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
  members: [mongoose.Schema.Types.ObjectId],
  messages: [{ userId: mongoose.Schema.Types.ObjectId, timestamp: Date, message: String }]
});