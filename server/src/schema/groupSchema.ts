


import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
  members: [mongoose.ObjectId],
  messages: [{userId:mongoose.ObjectId,timestamp:Date,message:String}]
});