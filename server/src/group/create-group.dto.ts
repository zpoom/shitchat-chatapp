import { IUser } from 'src/user/user.interface';

export class CreateGroupDto {
  groupname: String;
  members: Array<String>;
  messages: Array<object>;
  }