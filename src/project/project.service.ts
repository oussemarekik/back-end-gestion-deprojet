import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from 'src/reports/dto/create-report.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project} from './entities/project.entity';
import * as mongoose from "mongoose"

@Injectable()
export class ProjectService {
  constructor(@InjectModel('projects') private readonly projectModal: Model<Project>,) {
    console.log("ProjectService");
  
   };

  async create(createProjectDto: CreateProjectDto) {
    var project = new this.projectModal(createProjectDto);

    return await project.save();
  }

  async findAll() {
    return {
      "list" : await this.projectModal.find().populate('createBy').populate('teamLead')
    };
  }
 


  async findOne(id: string) {
  
    const project : Project= await this.projectModal.findById(id).populate('createBy').populate('members').populate('teamLead');
    console.log(project);
    return await this.projectModal.findById(id).populate('createBy').populate('members').populate('teamLead');
  }
  
  update(id: string, updateProjectDto: UpdateProjectDto) {

    return this.projectModal.findByIdAndUpdate(id,updateProjectDto);
  }

  remove(id: string) {
    return this.projectModal.findByIdAndDelete(id);
  }

  async addReport(projectId: string, createReportDto: CreateReportDto) {
    var option = { 'new': true };
    console.log(createReportDto);
    console.log(createReportDto.description);
    
    return await this.projectModal.findByIdAndUpdate(projectId,{$push: {reports: createReportDto}}, option);
  }
  async findReportTeamlead(teamleadId)
  {
    
    return  {"list": await this.projectModal.find({"teamLead": teamleadId})};
  }
  async findReportMember(memberId)
  {
    return  {"list": await this.projectModal.find({"teamLead": memberId})};
  }
}
