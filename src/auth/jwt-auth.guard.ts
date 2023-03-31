import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {

      super();
    }
  
    canActivate(context: ExecutionContext) {

      const isPublic = this.reflector.getAllAndOverride<boolean>(process.env.IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      console.log("rekik context : ",process.env.IS_PUBLIC_KEY);

      console.log("rekik context : ",context.getHandler());
      console.log("rekik isPublic : ",isPublic);

      if (isPublic) {
        return true;
      }

      return super.canActivate(context);
    }
  
    handleRequest(err, user, info) {        
      // You can throw an exception based on either "info" or "err" arguments
      console.log("rekik test : ", user,"********",err,info);

      if (err || !user) {
        throw err || new UnauthorizedException(info.message);
      }
      return user;
    }
  }