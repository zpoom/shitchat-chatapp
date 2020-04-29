import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IGroup } from './group.interface';
import {CreateGroupDto} from './create-group.dto';

@Injectable()
export class GroupService {
    constructor(@InjectModel('Group') private GroupModel: Model<IGroup>) { }

    async createGroup(createGroupDto: CreateGroupDto): Promise<IGroup> {
        const group = new this.GroupModel(createGroupDto);
        return await group.save();
    }

    async getJoinedGroup(name:any) {
         return await this.GroupModel.find({members: name});
    }

    async getNotJoinedGroup(name:any) {
        return await this.GroupModel.find({members: {$ne:name}});
    }

    async getAllGroup(){
        return await this.GroupModel.find({});
    }

}
