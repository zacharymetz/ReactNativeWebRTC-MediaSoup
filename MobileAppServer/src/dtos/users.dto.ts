import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  public username:string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
