import { HttpException } from "@/exceptions/HttpException";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { NextFunction } from "express";



// see if they are an admin 
const adminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if(req.user){
        // do a db query to get the user permission 
        const userAdminRole = await req.dbClient.getAuthRole(1);

        if(userAdminRole){
            next();
        }else{
            next(new HttpException(401, 'Wrong authentication scope'));
        }
    }else{
        // no user 
        next(new HttpException(401, 'Wrong authentication scope'));
    }
}

export default adminMiddleware;
