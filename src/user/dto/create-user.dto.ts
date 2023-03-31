import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, Length, Validate } from "class-validator";
import { Role } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;
    @ApiProperty({
        description: 'The Password must contain at least 8 characters',
        minimum: 8,
        default: "********",
     })
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;
    @ApiProperty()
    @IsNotEmpty()
    lastName: string;
    @IsEmpty()
    role: Role;
}
