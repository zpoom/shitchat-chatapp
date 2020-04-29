import { Injectable, HttpStatus } from '@nestjs/common';
import { IUser } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IGroup } from 'src/group/group.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private User: Model<IUser>, @InjectModel('Group') private Group: Model<IGroup>) { }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const u = await this.User.findOne({ username: createUserDto.username });
        if (u) return u;
        else {
            const user = new this.User(createUserDto);
            return await user.save();
        }
    }

    async joinGroup({ groupname, username }: any) {
        const user = await this.User.findOne({ username });
        if (!user) throw new Error('User not found')
        const group = await this.Group.findOne({ groupname: groupname });
        if (!group) throw new Error('Group not found');
        if (group.members.includes(username)) {
            console.log('g1 has u1');
            // used to join
            // get messages since latest read = [{message: string, timestamp: Date, username: string}]
            let latestRead = new Date();
            for (let idx in user.lastestReadTime) {
                if (user.lastestReadTime[idx].groupname === groupname) {
                    latestRead = user.lastestReadTime[idx].timestamp;
                }
            }
            const res = await this.Group.find({
                'messages.timestamp': {
                    $gte: latestRead
                }
            }, { groupname: 0, members: 0 })
            return res;
        } else {
            // never join
            group.members.push(username);
            await group.save();
            return [];
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
