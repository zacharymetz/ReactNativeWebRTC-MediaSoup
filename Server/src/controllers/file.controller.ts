import { Controller, UseBefore, Post, Req,Res, Get, Param } from 'routing-controllers';
import multer from 'multer'
import { Request, Response } from 'express';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { getDBClient } from '../db';
import authMiddleware from '@/middlewares/auth.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';


// this is our s3 connector for mino 
const s3 = new S3({
  accessKeyId: 'T3YYK3EL1F80Z7NOFJB1' ,
  secretAccessKey: 'n2e4F5fiAyQiZIx6jZdYFMVv86gkqPRr8RkACiQH' ,
  endpoint: 'http://127.0.0.1:9000' ,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4'
});

@Controller()
export class FileController {
  // this is a health check ping to see if the 
  // server is avalible
  @Post('/api/v0/upload/object')
  @UseBefore(authMiddleware)
  @UseBefore(multer({limits:{fileSize:40000000}}).single('object'))
  async uploadImage( @Req() req: RequestWithUser) {
    // upload a modded file 
    const params = {
        Bucket: 'platform-objects',
        Key: uuidv4() + '.' + req.file.originalname.split('.')[req.file.originalname.split('.').length-1], // File name you want to save as in S3
        Body: req.file.buffer
    };
    try{
      const data = await new Promise((resolve,reject)=>{
        // make this async 
        s3.putObject(params, function(err, data) {
              if (err)
              reject(err)
              else   
              resolve(data);
        });
      })
       
      // // make sure to record the file in the db and return the file id 
      const dbClient = await getDBClient();

      const dbRecord = await dbClient.createNewFileUpload(params.Bucket,params.Key,req.file,req.user.id);

      return {
        fileID : dbRecord.id // this is so it can be loaded and stored on the fe
      };

    }catch(e){
      throw e
    }
  }
  @Get('/api/v0/object/:id')
  async getImage( @Param('id') fileId: string, @Res() res : Response) {
    // query the db and return the image associated with the id 
    // and return it 

    // get the record from our db 
    const dbClient = await getDBClient();
    const dbRecord = await dbClient.createNewFileByID(fileId);

    // get the byte stream for the file and send it back to the client 
    try{
      // get the data 
      const bytes = await new Promise((resolve,reject)=>{
        s3.getObject({
          Bucket : dbRecord.bucket,
          Key : dbRecord.key
        },(err,data)=>{
          if(err)
            reject(err)
          else
            resolve(data.Body)
        })
      })


      // modify the body and the headers so it is read as an image 
      res.contentType(dbRecord.fileType)
      return bytes
    }catch(e){
      console.log(e)
      throw e
    }
  }
}
