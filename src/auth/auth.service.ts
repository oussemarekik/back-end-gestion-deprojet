import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
    constructor(
      private usersService: UserService,
      private jwtService: JwtService
      ) {
        console.log("authService")

      }
      private readonly logger = new Logger(AuthService.name);
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(auth: AuthDto) {
        const user   = await this.usersService.findOneByUsername(auth.username);
        console.log(user);
        if(user && user.password === auth.password) {
          console.log("user");
          const payload = { id: user._id, username: user.username, role: user.role, };
          this.logger.warn(user.role)
          this.logger.warn(user)
          this.logger.warn("**********************")
  
          return {
            access_token: this.jwtService.sign(payload),
          };
        }

        throw new BadRequestException('User not found',);
        
      }

      async register(createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
      }
}
