import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel, Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async users(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.UserWhereUniqueInput,
    @Query('where') where?: Prisma.UserWhereInput,
    @Query('orderBy') orderBy?: Prisma.UserOrderByWithRelationInput,
  ) {
    const params = {
      skip: skip,
      take: take,
      cursor: cursor,
      where: where,
      orderBy: orderBy,
    };
    return this.userService.users(params);
  }

  @Get(':userId')
  async user(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.user({ id: userId });
  }

  @Post('')
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Post('many-users')
  async manyUsers(@Body() usersList: Prisma.UserCreateManyInput) {
    return this.userService.manyUsers(usersList);
  }

  @Put(':userId/update')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() changes: Prisma.UserUpdateInput,
  ) {
    return this.userService.updateUser({
      where: { id: Number(userId) },
      data: changes,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
