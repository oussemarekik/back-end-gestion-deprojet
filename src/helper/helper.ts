import { SetMetadata } from '@nestjs/common';
import {v1 as uuidv1} from 'uuid';


export class Helper{
    static customFileName(req, file, cb) {
      const uniqueSuffix = uuidv1();
      let fileExtension = file.originalname.split(".").pop();
      
      const originalName = file.originalname.split(".")[0];
      cb(null, originalName + '-' + uniqueSuffix+"."+fileExtension);
    }
  }

  export const Public = () => SetMetadata(process.env.IS_PUBLIC_KEY, true);
