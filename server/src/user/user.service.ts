import { Injectable, HttpStatus } from '@nestjs/common';
import { IUser } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IGroup } from 'src/group/group.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private User: Model<IUser>, @InjectModel('Group') private Group: Model<IGroup>) { }

    async joinGroup({ groupname, username }: any) {
        const u = await this.User.findOne({ username });
        if (!u) throw new Error('User not found')
        const group = await this.Group.findOne({ groupname: groupname });
        const user = await this.User.findOne({ username: username, 'lastestReadTime.groupname': groupname });
        if (!group) throw new Error('Group not found');
        if (!user) {
            // Never join group
            group.members.push(username);
            await group.save();
            return [];
        }
        else {
            // join again
            const lastestReadTime = user.lastestReadTime['timestamp'];
            const res = this.Group.find({
                'messages.timestamp': {
                    $gte: lastestReadTime
                }
            }, { groupname: 0, members: 0, messages: 1 })
            return res;
        }
    }
    async sendMessage({ groupname, username, message }: any) {
        const group = await this.Group.findOne({ groupname: groupname });
        if (!group) throw new Error('Group not found');
        const res = { username, message, timestamp: new Date() }
        group.messages.push(res);
        await group.save();
        return res;
    }

}
