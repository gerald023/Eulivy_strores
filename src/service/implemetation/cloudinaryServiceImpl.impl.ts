import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import multer from 'multer';
import { CloudinaryService } from "../exports";
import { CustomError } from '../../error/customError.error';
import cloudinary from '../../utils/cloudinary.utils';


const storage = multer.memoryStorage()

export const upload = multer({ 
  storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
      fieldSize: 25 * 1024 * 1024, 
    },
  
    });

    export class CloudnaryServiceImpl implements CloudinaryService{
      
        async uploadImage(image: Express.Multer.File): Promise<string> {
            
                return new Promise<any>((resolve, reject) => {
                 const stream =  cloudinary.uploader.upload_stream({resource_type: "image"}, (error:any, result:any) => {
                    if (error) reject(error);
                    else resolve(result);
                  });
                  stream.end(image.buffer);

                });
               
              } 

              uploadSingle(file: Express.Multer.File): Promise<string> {
                return new Promise((resolve, reject) => {
                  const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'product_images' }, 
                    (error: any, result: any) => {
                      if (error) return reject(error);
                      if (result) return resolve(result.secure_url);
                    }
                  );
                  uploadStream.end(file.buffer);
                });
              }

              async uploadMultiple(files: Express.Multer.File[]): Promise<any> {
                if (!files) {
                  throw new Error("No files provided");
                }
                console.log("Files received for upload:", files);
                const uploadPromises = files.map(file => this.uploadImage(file)
                );
                return await Promise.all(uploadPromises);
              }
    
    
     

        // async uploadMutipleImages (file: string[]): Promise<UploadApiResponse | UploadApiErrorResponse | null> {
        //   return new Promise((resolve: any, reject: any)=>{
        //     cloudinary.uploader.upload(file,{
        //       folder: "st_Paul_cyon_Alesa"
        //     }, (error, result)=>{
        //       if (error) {
        //         console.log('error here cloudinary ' + error + ' ' + result)
        //         reject(error)
        //       } else{
        //         resolve(result)
        //       }
        //     })
            
        //   })
        // }

       
        
    }
    
    export default CloudnaryServiceImpl;
