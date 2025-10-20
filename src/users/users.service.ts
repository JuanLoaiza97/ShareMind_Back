import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  // Crear usuario con contraseña encriptada
  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      const saved = await user.save();
      const userObj = (saved as any)._doc || saved;
      delete userObj.password;
      return userObj;
    } catch (error) {
      if ((error as any).code === 11000) {
        throw new Error('El correo o nombre de usuario ya está registrado.');
      }
      throw error;
    }
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Buscar usuario por email (para login)
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Buscar usuario por ID (para obtener su perfil)
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).select('-password').exec();
  }
}
