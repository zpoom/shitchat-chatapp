import * as mongoose from 'mongoose';
import { IGroup } from 'src/group/group.interface';

export interface IUser extends mongoose.Document {
    username: String,
    lastestReadTime: [{ groupname: IGroup['groupname'], timestamp: Date }],
}