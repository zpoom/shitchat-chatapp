import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://dbUser:dbUserPassword@parallelchat-lbofg.mongodb.net/parallelchat?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}