import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('v1/auth/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() auth: AuthDto) {
    return this.authService.login(auth);
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
