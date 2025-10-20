// src/users/users.controller.ts
import { Body, Controller, Get, Post, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Registro de usuarios -> responder sin password
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const created = await this.usersService.create(createUserDto);
      const userObj: any = (created as any)._doc || created;
      delete userObj.password;
      return userObj;
    } catch (error) {
      // Si es error de clave duplicada (11000), devolvemos mensaje más claro
      if ((error as any).code === 11000) {
        throw new BadRequestException('El correo o nombre de usuario ya está registrado');
      }
      throw error;
    }
  }

  // Obtener todos los usuarios
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Perfil - protegido por JWT
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Request() req: any) {
    // req.user viene del JwtStrategy -> será el usuario sin password
    return req.user;
  }

  // NOTA: Quitamos el /users/login para evitar duplicidad con /auth/login
}
