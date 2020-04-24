import { Controller, Put, Body } from '@nestjs/common';
import { IGroup } from './group.interface';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Put()
    createGroup(@Body() group: IGroup){
        return this.groupService.createGroup(group);
    } 
}
