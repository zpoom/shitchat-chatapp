import { Module, Global } from '@nestjs/common';
import { GroupSchema } from 'src/schema/groupSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }])],
    controllers: [GroupController],
    providers: [GroupService],
    exports: [MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]), GroupService],
})
export class GroupModule { }
