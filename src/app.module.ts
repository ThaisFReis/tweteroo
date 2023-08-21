import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { SignUpDto } from './controller/sign-up.dto';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SignUpDto],
})

export class AppModule { }