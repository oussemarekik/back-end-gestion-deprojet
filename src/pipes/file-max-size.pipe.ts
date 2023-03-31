import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(value){
      const oneMo = 1024*1024;
      const maxFileSize = 5*oneMo;
  
      console.log(value.size);
      console.log(oneMo);
      if(value.size > maxFileSize) {
        console.log(value.size);
          throw new BadRequestException('Invalid Input Data Size '+ (value.size/oneMo).toFixed(3) + ' Mo / '+ (maxFileSize/oneMo).toFixed(0) + ' Mo');
      }
    }
    
    return value;
  }
}