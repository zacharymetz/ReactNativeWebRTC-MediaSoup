import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { getDBClient } from '@/db';

class UserService {
  public async findAllUser(): Promise<User[]> {
    const dbClient = await getDBClient();
    return dbClient.getAllUsers();
  }

  public async findUserById(userId: number): Promise<User> {
    const dbClient = await getDBClient();
    const findUser: User = await dbClient.getUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const dbClient = await getDBClient();
    const findUser: User = await dbClient.getUserByEmail(userData.email);
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User =  await dbClient.createUser(userData,hashedPassword)

    return createUserData;
  }

}

export default UserService;
