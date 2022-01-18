import { DBClient } from "./db";

declare namespace Express {
    export interface Request {
       dbClient?: DBClient
       pubMessagingClient?: string
    }
 }