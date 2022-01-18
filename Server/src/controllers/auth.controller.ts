import { Response } from 'express';
import { Controller, Req, Body, Post, UseBefore, HttpCode, Res } from 'routing-controllers';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { validationMiddleware } from '@middlewares/validation.middleware';
import AuthService from '@services/auth.service';

@Controller()
export class AuthController {
  public authService = new AuthService();

  @Post('/api/auth/signup')
  //@UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @HttpCode(201)
  async signUp(@Res() res: Response,@Body() userData: CreateUserDto) {
    // check 
    if(userData.anonymous){
      // give it random data for 
      userData.email = new Date().getTime() + "@fuckya.ca";
      userData.username = "user";
      userData.password = ""
    }
    const signUpUserData: User = await this.authService.signup(userData);

    // on a sign up make sure to set their headers like the login
    const { cookie, findUser,tokenData } = await this.authService.login(userData,userData.password=="");

    res.setHeader('Set-Cookie', [cookie]);
    return { data: signUpUserData, message: 'signup', token : tokenData };
  }


  @Post('/api/v0/login')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  async logIn(@Res() res: Response, @Body() userData: CreateUserDto) {
    const { cookie, findUser,tokenData } = await this.authService.login(userData,false);

    res.setHeader('Set-Cookie', [cookie]);
    return { data: findUser, message: 'login', tokenData };
  }

  @Post('/api/v0/logout')
  @UseBefore(authMiddleware)
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    const userData: User = req.user;
    const logOutUserData: User = await this.authService.logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    return { data: logOutUserData, message: 'logout' };
  }

  
}
