import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  public username:string;
  public anonymous:boolean;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
