import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, Options } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/helper/helper';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('projects')
@UseGuards(JwtAuthGuard)
@Controller('v1/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @ApiOperation({ summary: 'Save Project' })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    createProjectDto.createBy = req.user.id;
    return this.projectService.create(createProjectDto);
  }
  @Get()
  findAll() {
    return this.projectService.findAll() 
  } 

  @Get('teamlead')
  getByTeamlead(@Req() req) {
   
    return this.projectService.findReportTeamlead(req.user.id);
  }
  @Get('memebr')
  getByMember(@Req() req) {
    console.log(req.user.id);
    return this.projectService.findReportTeamlead(req.user.id);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {

  
    return this.projectService.findOne(id);
  }
  


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
/* 
  @Get('teamleadd')
  findProjectTeamlead()
  {
    console.log("hi");
   // return this.projectService.findReportTeamlead(req.user.id);
  } */

}
