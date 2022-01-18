import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@dtos/users.dto';
import { Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { validationMiddleware } from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';

@Controller()
export class ChatController {
  public userService = new userService();


  @Get('/api/chat/new_chat_room')
  @OpenAPI({ summary: 'Send a request to see if you have valid auth creds' })
  @UseBefore(authMiddleware)
  async createNewChatRoom(@Req() request: RequestWithUser) {
    // if admin create a new chat room ( for shirts )
     
    return { data: request.user.id,tokenData : request.headers.authorization };
  }

  @Get('/api/chat/get_chat_message')
  @OpenAPI({ summary: 'returns details in the users profile ' })
  @UseBefore(authMiddleware)
  async getMessages(@Req() request: RequestWithUser) {

     
    return { data: request.user.id,tokenData : request.headers.authorization };
  }

  @Post('/api/chat/new_message')
  @OpenAPI({ summary: 'updates the users profile' })
  @UseBefore(authMiddleware)
  async createMessage(@Req() request: RequestWithUser) {
     
    return { data: request.user.id,tokenData : request.headers.authorization };
  }
}
