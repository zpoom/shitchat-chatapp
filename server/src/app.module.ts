import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { GroupService } from './group/group.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://dbUser:dbUserPassword@parallelchat-lbofg.mongodb.net/parallelchat?retryWrites=true&w=majority'), UserModule, GroupModule],
  controllers: [AppController, UserController, GroupController],
  providers: [AppService, AppGateway, GroupService, UserService],
})
export class AppModule {}