import { IUser } from 'src/user/user.interface';

export class CreateGroupDto {
  groupname: String;
  members: [IUser['username']];
  messages: [{ username: IUser['username'], timestamp: Date, message: String }];
  }