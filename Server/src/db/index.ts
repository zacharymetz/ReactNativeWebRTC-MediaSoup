import { MissionQueryDto } from '@/dtos/mission.dto';
import { CreateUserDto } from '@/dtos/users.dto';
import { FactLibraryEntry } from '@/interfaces/factLibrary.interface';
import { File,FileWithoutBuffer } from '@/interfaces/file.interface';
import { HowToSteps, Mission, MissionReward } from '@/interfaces/mission.interface';
import { User } from '@/interfaces/users.interface';
import { Client } from 'pg'
// create and init the connection to the class below 
//TODO, get the request so we can close it at the end 

var globalDBClient:any;

// change this so that only one db client is used at a time 
export const getDBClient = async () => {
    if(globalDBClient){
        return globalDBClient;
    }else{
        globalDBClient = new DBClient();
        globalDBClient.init();
    }
    return globalDBClient;
}


export class DBClient{
    
   
    
    
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
            SELECT id, email, firstname,lastname, hashedpassword, createdat, lastlogin
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
                    firstName : result.firstname,
                    lastName : result.lastname
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
            SELECT id, email, firstname,lastname, hashedpassword, createdat, lastlogin
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
                    firstName : result.firstname,
                    lastName : result.lastname
                }
        }catch(e){
            // log error 
            console.log(e)
        }
        

        return null;
     
    }
    /* return something if the user has the auth role, if not return nothing , this is so you can give access control */
    async getAuthRole(userId: number) {
        try{
            let query = `
            SELECT id
                FROM platform."adminRole"
                where id = $1
            ;
            `
            const result = (await this.client.query(query, [userId])).rows[0]

            
            // parse it into  a user 
            if(result) 
                return {
                    id : result.id
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
            SELECT *
            FROM platform."user";
            ;
            `
            const result = (await this.client.query(query, [])).rows
            result.map(row => ({
                id : result.id,
                email : result.email,
                password : result.hashedpassword,
                firstName : result.firstname,
                lastName : result.lastname
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
                email,firstname,lastname, hashedpassword, lastlogin)
               VALUES ($1,$2,$3,$4, now()) returning *;
            ;
            `
            const result = (await this.client.query(query, [userData.email,userData.username,userData.username,hashedPassword])).rows[0]

            
            // parse it into  a user 
            if(result) 
                return {
                    id : result.id,
                    email : result.email,
                    password : result.hashedpassword,
                    firstName : result.firstname,
                    lastName : result.lastname
                }
        }catch(e){
            // log error 
            console.log(e)
        }
        

        return null;
    }

    async getUserProfile(){
        const query = `
            INSERT INTO platform.mission_completion_record(mission_id, user_id)
	        VALUES ($1, $2) returning *;
        `;
        const result = (await this.client.query(query, [])).rows[0];
        return true;
    }

    async updateUserProfile(){
        const query = `
            INSERT INTO platform.mission_completion_record(mission_id, user_id)
	        VALUES ($1, $2) returning *;
        `;
        const result = (await this.client.query(query, [])).rows[0];
        return true;
    }


    async createNewFileUpload(Bucket: string, Key: string, file: Express.Multer.File,uploaderID:number):Promise<File> {
        try{
            let query = `
                INSERT INTO platform.file(
                    size_in_bytes, bucket, key, file_type, uploaded_by_user)
                    VALUES ( $1, $2, $3, $4, $5) returning *;
            `
            const result = (await this.client.query(query, [file.size,Bucket,Key,file.mimetype,uploaderID])).rows[0]
            // parse it into a file
            if(result) 
                return {
                    id:result.id,
                    sizeInBytes: result.size_in_bytes,
                    bucket: result.bucket,
                    key: result.key,
                    fileType: result.file_type,
                    dateUpdaled: new Date(result.date_uploaded),
                    UploadedByUser:result.uploaded_by_user,
                    buffer : file.buffer,
                }
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async createNewFileByID(fileID:string):Promise<FileWithoutBuffer|null>{
        try{
            let query = `
               Select * from platform.file where id=$1;
            `
            const result = (await this.client.query(query, [fileID])).rows[0]

            if(result) 
                return {
                    id:result.id,
                    sizeInBytes: result.size_in_bytes,
                    bucket: result.bucket,
                    key: result.key,
                    fileType: result.file_type,
                    dateUpdaled: new Date(result.date_uploaded),
                    UploadedByUser:result.uploaded_by_user,
                }
        }catch(e){
            console.log(e)
            throw e
        }
    }


    /*
        Badge realted quries
    */




    /*
        Mission Related queries
    */

    async createMission(title:string,description:string,platform:string,actionurl:string,headerImageId:string,dateExpirtes:Date):Promise<Mission>{
        
        let query = `
            INSERT INTO platform.mission(
            title, platform,  description,image, actionurl , dateexpirtes)
            VALUES ($1, $2, $3, $4, $5, $6 ) returning *;
            `
        const result = (await this.client.query(query, [
            title,platform,description,headerImageId,actionurl,dateExpirtes
        ])).rows[0];


        return {
            id : result.id,
            title: result.title,
            description : result.description,
            platform : result.platform,
            headerImageId : result.image,
            dateExpirtes : new Date(result.dateexpirtes),
            actionUrl : result.actionurl,
            dateCreated : new Date(result.datecreated)
        };
        
    }
    async createMissionHowToSteps(howToSteps: HowToSteps[],missionID: number):Promise<HowToSteps[]>{
        const vars = [];
        // flatten the list of how to steps
        let query = `
            INSERT INTO platform.mission_how_to_step(
                mission_id, image, description)
                VALUES  
            `
        // add all the values 
        for(const step of howToSteps){
            vars.push(missionID, step.headerImageId,step.description);
            query += "( $" + (vars.length - 2) + ", $"+(vars.length - 1) + ", $" +vars.length  + " ),";
        }

        // get reid of the last char from the string 
        query = query.substring(0, query.length - 1);
        // add the returning thing 
        query += "  returning *;"

        const rows = (await this.client.query(query, vars)).rows;
        const result:HowToSteps[] = [];

        for(const row of rows){
            result.push({
                id : row.id,
                headerImageId : row.image,
                description : row.description
            })
        }
        return result;
    }
    async createMissionReward(missionRewardData: MissionReward,missionID: number):Promise<MissionReward>{
        
        let query = `
            INSERT INTO platform.mission_reward(
                mission_id, isbadge, badgeid, pointvalue)
                VALUES ($1, $2, $3, $4) returning *;
            `
        const result = (await this.client.query(query, [missionID,missionRewardData.isBadge,missionRewardData.badgeID,missionRewardData.pointValue])).rows[0];

        return {
            id : result.id,
            missionID : result.mission_id,
            isBadge : result.isbadge,
            pointValue : result.pointvalue,
            badgeID : result.badgeid

        }
        
    }

    async getMissionById(missionID:number):Promise<Mission>{
        const query = `
        SELECT id, title, platform, image, description, actionurl, datecreated, dateexpirtes
	    FROM platform.mission where id = $1;
    `;
        const mission = (await this.client.query(query, [missionID])).rows[0];
         
        
        return {
            id : mission.id,
            title :  mission.title,
            description :  mission.description,
            actionUrl :  mission.actionUrl,
            headerImageId  : mission.image,
            dateCreated : null,
            dateExpirtes : new Date( mission.dateexpirtes),
            platform :  mission.platform
        };
    }

    async getMissionHowToStepsByMissionID(missionID:number):Promise<HowToSteps[]>{
        const query = `
        SELECT id, mission_id, image, description
        FROM platform.mission_how_to_step where mission_id = $1;
    `;
        const rows = (await this.client.query(query, [missionID])).rows;
        
        return rows.map((row)=>({
            id : row.id,
            headerImageId:row.image,
            
            description : row.description
        }));
    }

    async getMissionRewardsByMissionID(missionID:number):Promise<MissionReward>{
        const query = `
        SELECT id, mission_id, isbadge, badgeid, pointvalue
	    FROM platform.mission_reward where mission_id = $1;
    `;
        const missionRewards = (await this.client.query(query, [missionID])).rows[0];
        if(!missionRewards)
            throw "Cannont get mission rewards"
        return {
            id : missionRewards.id,
            pointValue : missionRewards,
            isBadge : missionRewards.isBadge,
            badgeID : missionRewards.badgeID,
            missionID : missionRewards.mission_id
        };
    }

    // get a list of missions 
    async getMissionByIds(missionIDs: number[]):Promise<Mission[]> {
      
           
            let query = `
            SELECT  *
            FROM platform.mission
            where platform.mission.id IN (
            
                `
                // now add the vars thing at the end of it 
                for(const i in missionIDs){
                    query += " $" + ( parseInt(i)+1) + ",";
                }

                // remove the last char and add this 
                query = query.substring(0, query.length - 1);
                query +=  ") ;"
                console.log({query})
                const rows = (await this.client.query(query, [...missionIDs])).rows;

                 
                 
                return rows.map(mission=>({
                    id : mission.id,
                    title :  mission.title,
                    description :  mission.description,
                    actionUrl :  mission.actionUrl,
                    headerImageId  : mission.image,
                    dateCreated : null,
                    dateExpirtes : new Date( mission.dateexpirtes),
                    platform :  mission.platform
                }));
             
         
    }
    async getMissionHowToStepsByMissionIDs(missionIDs:number[]):Promise<HowToSteps[]>{
        let query = `
        SELECT id, mission_id, image, description
        FROM platform.mission_how_to_step where mission_id in (
    `;
        // now add the vars thing at the end of it 
        for(const i in missionIDs){
            query += " $" + ( parseInt(i)+1) + ",";
        }

        // remove the last char and add this 
        query = query.substring(0, query.length - 1);
        query +=  ") ;"
        console.log({query})
        const rows = (await this.client.query(query, [...missionIDs])).rows;
        
        return rows.map((row)=>({
            id : row.id,
            headerImageId:row,
            description : row,
            missionId : row.mission_id,
        }));
    }

    async getMissionRewardsByMissionIDs(missionIDs:number[]):Promise<MissionReward>{
        let query = `
        SELECT id, mission_id, isbadge, badgeid, pointvalue
	    FROM platform.mission_reward where mission_id in (
    `;
        // now add the vars thing at the end of it 
        for(const i in missionIDs){
            query += " $" + ( parseInt(i)+1) + ",";
        }
        query = query.substring(0, query.length - 1);
        query +=  ") ;"
        console.log({query})
        const rows = (await this.client.query(query, [...missionIDs])).rows;
         
        return rows.map(missionRewards=>({
            id : missionRewards.id,
            pointValue : missionRewards,
            isBadge : missionRewards.isBadge,
            badgeID : missionRewards.badgeID,
            missionID : missionRewards.mission_id
        }));
    }


    async queryMissions(missionQuery: MissionQueryDto):Promise<number[]>{
        const query = `
            SELECT id from platform.mission;
        `;
        const result = (await this.client.query(query, [])).rows;
        return result.map(x=>x.id);
    }

    async createActionUrlConsumedActions(missionID:number,userID:number):Promise<boolean>{
        const query = `
        INSERT INTO platform.mission_action_url_consumed_record(
            mission_id, user_id)
           VALUES ($1,$2) returning *;
        `;
        const result = (await this.client.query(query, [missionID,userID])).rows[0];
        return result;
    }

    async createMissionCompleteionRecord(missionID:number,userID:number):Promise<boolean>{
        const query = `
            INSERT INTO platform.mission_completion_record(mission_id, user_id)
	        VALUES ($1, $2) returning *;
        `;
        const result = (await this.client.query(query, [missionID,userID])).rows[0];
        return true;
    }

    async getMissionCompletionStatus(missionID:number,userID:number):Promise<{
        mission_action_url_consumed_record_id? : number,
        mission_action_url_consumed_record_date_completed?:Date,
        mission_completion_record_id: number,
        mission_completion_record_date_completed:Date,
    }>{
        const query = `
        SELECT 	platform.mission_action_url_consumed_record.id as "mission_action_url_consumed_record_id",
                platform.mission_action_url_consumed_record.date_completed as "mission_action_url_consumed_record_date_completed",
                platform.mission_completion_record.id as "mission_completion_record_id",
                platform.mission_completion_record.date_completed as "mission_completion_record_date_completed"
        FROM platform.mission_action_url_consumed_record
        left join platform.mission_completion_record
        on platform.mission_action_url_consumed_record.mission_id = platform.mission_completion_record.mission_id
        where platform.mission_action_url_consumed_record.mission_id = $1 and platform.mission_action_url_consumed_record.user_id = $2
        ;
                `;
        const result = (await this.client.query(query, [missionID,userID])).rows[0];
        console.log(result)
        return result;
    }



    /* these are fact libary related quries down here */
    async getFactLibraryEntries(parentID:number):Promise<FactLibraryEntry[]>{
        const query = `
        SELECT id, name, type, thumbnail, file, date_created
        FROM platform.fact_library_entry
        where parent_id=$1 and archived = false;
                `;
        const result = (await this.client.query(query, [parentID])).rows;
        // loop through them and make sure they work properly
        return result;
    }   

    async createFactLibraryEntry(){
        const query = `
            INSERT INTO platform.mission_completion_record(mission_id, user_id)
	        VALUES ($1, $2) returning *;
        `;
        const result = (await this.client.query(query, [])).rows[0];
        return true;
    }

    async updateFactLibraryEntry(){
        const query = `
            INSERT INTO platform.mission_completion_record(mission_id, user_id)
	        VALUES ($1, $2) returning *;
        `;
        const result = (await this.client.query(query, [])).rows[0];
        return true;
    }

    async archiveFactLibraryEntry(){
        const query = `
            INSERT INTO platform.mission_completion_record(mission_id, user_id)
	        VALUES ($1, $2) returning *;
        `;
        const result = (await this.client.query(query, [])).rows[0];
        return true;
    }
   
}


 