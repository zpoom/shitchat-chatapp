import { Injectable, HttpStatus } from '@nestjs/common';
import { IUser } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IGroup } from 'src/group/group.interface';
import {CreateUserDto} from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private User: Model<IUser>, @InjectModel('Group') private Group: Model<IGroup>) { }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const user = new this.User(createUserDto);
        return await user.save();
    }
    async joinGroup(groupId: string, userId: string) {
        const group = await this.Group.findById(groupId);
        const user = await this.User.findById(userId);
        if (!group) throw new Error('Group not found');
        if (!user) {
            // Never join group
            group.members.push(userId);
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

    async temporaryLeaveGroup({ groupname, username }: any) {
        const group = await this.Group.findOne({ groupname });
        if (!group) throw new Error('Group not found');
        const leavingUser = await this.User.findOne({ username });
        for (let idx in leavingUser.lastestReadTime) {
            if (leavingUser.lastestReadTime[idx].groupname === groupname) {
                leavingUser.lastestReadTime[idx].timestamp = new Date();
                break;
            }
        }
        await leavingUser.save();
    }
    async leaveGroup({ groupname, username }: any) {
        const group = await this.Group.findOne({ groupname });
        if (!group) throw new Error('Group not found');
        const leavingUser = await this.User.findOne({ username });
        if (!leavingUser) throw new Error('User not found');
        group.members.pull(username);
        await group.save();
        return [];
    }
}
