import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IGroup } from './group.interface';
@Injectable()
export class GroupService {
    constructor(@InjectModel('Group') private GroupModel: Model<IGroup>) { }

}
