import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('drafts')
  async getDraftPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: false },
    });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.post({ id: id });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('draft')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  async publishPost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: id },
      data: { published: true },
    });
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.deletePost({ id: id });
  }
}
