import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { UserController } from './user.controller';
import { PostController } from './post.controller';

@Module({
  controllers: [AppController, UserController, PostController],
  providers: [AppService, PrismaService, UserService, PostService],
})
export class AppModule {}
