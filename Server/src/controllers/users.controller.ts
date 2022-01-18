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
export class UsersController {
  public userService = new userService();


  @Get('/api/user/validate_auth_token')
  @OpenAPI({ summary: 'Send a request to see if you have valid auth creds' })
  @UseBefore(authMiddleware)
  async validateAuthToken(@Req() request: RequestWithUser) {
     
    return { data: request.user.id,tokenData : request.headers.authorization };
  }

  @Get('/api/user/user_profile:id')
  @OpenAPI({ summary: 'returns details in the users profile ' })
  @UseBefore(authMiddleware)
  async getMyProfile(@Req() request: RequestWithUser) {

    // load the user profile and what not

    // return the user profile 
     
    return { data: request.user.id,tokenData : request.headers.authorization };
  }

  @Post('/api/user/profile')
  @OpenAPI({ summary: 'updates the users profile' })
  @UseBefore(authMiddleware)
  async updateMyProfile(@Req() request: RequestWithUser) {
     
    return { data: request.user.id,tokenData : request.headers.authorization };
  }
}
