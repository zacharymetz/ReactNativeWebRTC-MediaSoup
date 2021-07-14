import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/users.interface';
import UserService from '@/services/users.service';
import { Client } from 'pg'
// create and init the connection to the class below 
//TODO, get the request so we can close it at the end 
export const getDBClient = async () => {
    const client = new DBClient();
    await client.init();
    return client;
}


class DBClient{
    
    client:any;
    constructor(){
       this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            port: 5432,
       })
        
    }
    async init(){
        await this.client.connect()
    }
    async end(){
        await this.client.end()
    } 
    async getUserByEmail(email:string):Promise<User|null>{ 
        try{
            let query = `
            SELECT id, email, username, hashedpassword, createdat, lastlogin
            FROM platform."user"
            where email = $1
            ;
            `
            const result = (await this.client.query(query, [email])).rows[0]
            console.log({result})
            
            // parse it into  a user 
            if(result) 
                return {
                    id : result.id,
                    email : result.email,
                    password : result.hashedpassword,
                    username : result.username
                }
        }catch(e){
            // log error 
            console.log(e)
        }
        

        return null;
    }
    async getUserById(userId: number): Promise<User|null>{
        try{
            let query = `
            SELECT id, email, username, hashedpassword, createdat, lastlogin
                FROM platform."user"
                where id = $1
            ;
            `
            const result = (await this.client.query(query, [userId])).rows[0]

            
            // parse it into  a user 
            if(result) 
                return {
                    id : result.id,
                    email : result.email,
                    password : result.hashedpassword,
                    username : result.username
                }
        }catch(e){
            // log error 
            console.log(e)
        }
        

        return null;
     
    }
    async getAllUsers(): Promise<User[]> {
        
        try{
            let query = `
            SELECT id, email, username, hashedpassword, createdat, lastlogin
            FROM platform."user";
            ;
            `
            const result = (await this.client.query(query, [])).rows
            result.map(row => ({
                id : 1,
                email : "",
                password : ""
            }));
            return result;
        }catch(e){
            // log error 
            console.log(e)
        }
        

        return [];
       
    }
    async createUser(userData: CreateUserDto, hashedPassword: string): Promise<User> {
 
        try{
            let query = `
            INSERT INTO platform."user"(
                email,userName, hashedpassword, lastlogin)
               VALUES ($1,$2,$3, now()) returning *;
               
            ;
            `
            const result = (await this.client.query(query, [userData.username,userData.email,hashedPassword])).rows[0]

            
            // parse it into  a user 
            if(result) 
                return {
                    id : result.id,
                    email : result.email,
                    password : result.hashedpassword,
                    username : result.username
                }
        }catch(e){
            // log error 
            console.log(e)
        }
        

        return null;
    }
}