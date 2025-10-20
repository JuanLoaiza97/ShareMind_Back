// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'superSecretKey',
    });
  }

  // payload = { username, sub }
  async validate(payload: any) {
    // buscamos el usuario en BD y retornamos el usuario sin password
    const user = await this.usersService.findById(payload.sub);
    // findById ya hace .select('-password'), según tu service
    return user; // req.user será este objeto
  }
}
