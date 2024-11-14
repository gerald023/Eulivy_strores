import multer from 'multer';
import { CustomError } from '../error/customError.error';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new CustomError(400,'Only images of type JPEG, JPG, PNG, and GIF are allowed') as unknown as null, false); // Reject the file
  }
};

// const upload = multer({
//   storage,
//   fileFilter,
// });



const storage = multer.memoryStorage(); // Use memory storage

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});


export default upload;