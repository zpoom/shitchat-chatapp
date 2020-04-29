import { Controller, Put, Get, Body, Param } from '@nestjs/common';
import { IGroup } from './group.interface';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Put()
    createGroup(@Body() group: IGroup){
        return this.groupService.createGroup(group);
    } 

    @Get()
    getAllGroup(){
        return this.groupService.getAllGroup();
    }

    @Get(':id')
    getJoinedGroup(@Param() params){
        return this.groupService.getJoinedGroup(params.id);
    }
    
    @Get('not/:id')
    getNotJoinedGroup(@Param() params){
        return this.groupService.getNotJoinedGroup(params.id);
    }
}
