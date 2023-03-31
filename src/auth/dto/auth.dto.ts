import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @ApiProperty({default: "fahmi"})
    @IsNotEmpty()
    username: string;

    @ApiProperty({default: "123456789"})
    @IsNotEmpty()
    password: string;
}
