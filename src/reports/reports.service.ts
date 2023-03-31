import { Injectable } from '@nestjs/common';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Reports } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    private projectService: ProjectService,
    ) {
      console.log("reportService")
    }

  async create(projectId: string, createReportDto: CreateReportDto) {
  
    return await this.projectService.addReport(projectId, createReportDto);
  }


  async findOne(projectId: string, reportId: string) : Promise<Reports>{
    const project : Project = await this.projectService.findOne(projectId);
    const report : Reports = project.reports.find(report => report._id == reportId);
    return report;
  }
  async findByProject(projectId:string)
  {
    const project :Project=await this.projectService.findOne(projectId);
    
    return {"list":project.reports};
  }

  
}
