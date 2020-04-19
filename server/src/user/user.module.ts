import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/userSchema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GroupModule } from 'src/group/group.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), GroupModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
