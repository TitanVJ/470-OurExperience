import { Request } from 'express';

const multer = require('multer');
const path = require('path');
const storagePath = path.join(__dirname, '../uploads/');

const configurationStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, storagePath);
  },

  filename: function (req: Request, file: any, cb: any) {
    const filename = new Date().valueOf() + '_' + file.originalname;
    cb(null, filename);
  }
});

export const pdfUpload = multer({
  storage: configurationStorage,
  fileFilter: (req: Request, file: any, cb: any) => {
    checkFIleType(file, cb);
  }
}).single('pdfUpload');

const checkFIleType = (file: any, cb: any) => {
  const fileTypes = /pdf/;
  const fileExtention = fileTypes.test(path.extname(file.originalname.toLowerCase()));
  const mimeType = fileTypes.test(file.mimetype);

  if (fileExtention && mimeType) {
    return cb(null, true);
  }
  return cb(new Error('pdf only!'));
};
