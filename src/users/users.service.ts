// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UsersService {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  // Crear usuario con hash de contraseña
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword, // Guardar la contraseña encriptada
    });

    return user.save();
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Buscar usuario por email (para login)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
