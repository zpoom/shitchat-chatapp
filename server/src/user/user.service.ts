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
        if (!user) throw new Error('User not found');
        group.members.push(userId);
        user.lastestReadTime.push({ groupId, timestamp: new Date() });
        await group.save();
        await user.save();
    }
    async sendMessage(groupId: string, userId: string, message: string) {
        const group = await this.Group.findById(groupId);
        if (!group) throw new Error('Group not found');
        group.messages.push({ userId, message, timestamp: new Date() });
    }

}
