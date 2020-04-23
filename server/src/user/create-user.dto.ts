import { IGroup } from 'src/group/group.interface';

export class CreateUserDto {
    name: String;
    lastestReadTime: [{ groupname: IGroup['name'], timestamp: Date }];
  }