import * as mongoose from 'mongoose';
import { IGroup } from 'src/group/group.interface';

export interface IUser extends mongoose.Document {
    name: string,
    lastestReadTime: [{ groupId: IGroup['_id'], timestamp: Date }];
}