import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Helper } from 'src/helper/helper';

export function ApiFile() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: "./"+process.env.UPLOAD_DIR,
          filename: Helper.customFileName ,
        }),
      }))
  );
}