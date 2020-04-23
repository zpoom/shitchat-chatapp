import * as mongoose from 'mongoose';
import { IUser } from 'src/user/user.interface';
export interface IGroup extends mongoose.Document {
    groupname: String,
    members: [IUser['username']],
    messages: [{ username: IUser['username'], timestamp: Date, message: String }]
}