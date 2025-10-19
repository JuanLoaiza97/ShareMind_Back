import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🔹 Registro de usuarios
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    // 👉 NO hacemos hash aquí, solo mandamos el dto al service
    return this.usersService.create(createUserDto);
  }

  // 🔹 Obtener todos los usuarios
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // 🔹 Login de usuarios
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    } 

    // 🔑 Devolvemos los datos básicos (luego puedes reemplazar por JWT)
    return {
      message: 'Login exitoso',
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        country: user.country,
        languages: user.languages,
        interests: user.interests,
        bio: user.bio,
      },
    };
  }
}
