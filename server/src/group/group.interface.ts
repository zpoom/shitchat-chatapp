import * as mongoose from 'mongoose';
import { IUser } from 'src/user/user.interface';
export interface IGroup extends mongoose.Document {
    name: string,
    members: [IUser['id']],
    messages: [{ userId: IUser['_id'], timestamp: Date, message: String }]
}