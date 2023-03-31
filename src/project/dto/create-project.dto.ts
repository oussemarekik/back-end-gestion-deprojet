/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { ProjectStatus } from "../entities/project.entity";

export class CreateProjectDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @ApiPropertyOptional()
    @IsDateString()
    @IsOptional()
    endDate: string;

    @ApiProperty({ enum: ProjectStatus})
    @IsNotEmpty()
    @IsEnum(ProjectStatus)
    status: ProjectStatus;
    @IsEmpty()
    createBy: User;

    @ApiProperty()
    members: User[];
    teamLead: User;

}
