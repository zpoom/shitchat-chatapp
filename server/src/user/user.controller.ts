import { Controller, Put, Body } from '@nestjs/common';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Put()
    createUser(@Body() user: IUser){
        this.userService.createUser(user);
        return true;
    } 
}
