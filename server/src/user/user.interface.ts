import * as mongoose from 'mongoose';
import { IGroup } from 'src/group/group.interface';

export interface IUser extends mongoose.Document {
    name: String,
    lastestReadTime: [{ groupname: IGroup['name'], timestamp: Date }];
}