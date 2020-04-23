import { IUser } from 'src/user/user.interface';

export class CreateGroupDto {
    name: String;
    members: [IUser['name']];
    messages: [{ username: IUser['name'], timestamp: Date, message: String }];
  }