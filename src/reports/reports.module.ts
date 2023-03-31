import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [ProjectModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {
  constructor() {}
}
