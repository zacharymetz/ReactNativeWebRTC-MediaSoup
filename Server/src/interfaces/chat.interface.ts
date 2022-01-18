import { User } from "./users.interface";

export interface  message {
    id:number,
    roomId:number
    messageBody :string,
    timeStamp : Date,
    user : User,
    superChatValue:number
}

export interface chatRoom{
    id:number,
    name:string,
    routerID:string
}