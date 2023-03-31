import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmpty, IsEnum, IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { ReportsPriority, ReportsSeverity } from "../entities/report.entity";

export class CreateReportDto {
    @ApiPropertyOptional()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    createDate: string;

    @IsEmpty()
    createBy: User;

    @ApiProperty({ enum: ReportsSeverity})
    @IsNotEmpty()
    @IsEnum(ReportsSeverity)
    severity: ReportsSeverity;

    @ApiProperty({ enum: ReportsPriority})
    @IsNotEmpty()
    @IsEnum(ReportsPriority)
    priority: ReportsPriority;

    @IsEmpty()
    filePath: string;
}
