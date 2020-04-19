import * as mongoose from 'mongoose';
import { IUser } from 'src/user/user.interface';
export interface IGroup extends mongoose.Document {
    name: String,
    members: [IUser['name']],
    messages: [{ username: IUser['name'], timestamp: Date, message: String }]
}