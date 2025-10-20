import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ✅ Validar usuario y contraseña
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    // Comprobamos contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    // Eliminamos el password del objeto que retornamos
    const userObj = (user as any)._doc || user;
    const { password: _, ...result } = userObj;
    return result;
  }

  // ✅ Generar token y retornar datos completos
  async login(user: any) {
    const payload = { sub: user._id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        country: user.country,
        languages: user.languages,
        interests: user.interests,
        bio: user.bio,
      },
    };
  }
}
