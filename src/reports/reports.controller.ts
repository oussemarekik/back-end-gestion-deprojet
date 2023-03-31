import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, StreamableFile, Res, HttpCode, Header, SetMetadata } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileSizeValidationPipe } from 'src/pipes/file-max-size.pipe';
import { Public } from 'src/helper/helper';
import { ApiFile } from 'src/decorators/api-file.decorator';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Reports } from './entities/report.entity';

@ApiTags('reports')
@UseGuards(JwtAuthGuard)
@Controller('v1')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Add a report in Project' })
  @ApiFile()
  @Post("/project/:id/report")
  create(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Body() createReportDto: CreateReportDto, 
    @Param('id') projectId: string,
    @Req() req
    ) {
    
    createReportDto.createDate = new Date().toISOString();
    createReportDto.createBy = req.user.id;
    
    if(file){
      createReportDto.filePath = process.env.UPLOAD_DIR+file.filename;
    }
    
    
    return this.reportsService.create(projectId, createReportDto);
  }

  @Get('project/:id/reports')
  async reportByProject(@Req() req, @Param('id') projectId: string,) {
    return await this.reportsService.findByProject(projectId);  }
  
  @Public()
  @ApiOperation({ summary: 'download the report file for Project' })
  @Get("/project/:projectId/report/:reportId/download")
  async download(@Param('projectId') projectId: string ,@Param('reportId') reportId: string,) : Promise<StreamableFile> {
    const report : Reports = await this.reportsService.findOne(projectId, reportId);
    const file = createReadStream(join(process.cwd(), report.filePath));
    return new StreamableFile(file);
  }


  @Get('reports/:id')
  findOne(@Param('projectId') projectId: string ,@Param('reportId') reportId: string,) {
    return this.reportsService.findOne(projectId, reportId);
  }
}


