import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Inyectamos el modelo de usuarios
  // constructor(@InjectModel(nombre del modelo) private nombreVariable: Model<nombre del modelo>)
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async getAll() {
    return await this.usersModel.find();
  }

  // async findByRole(role: string) {
  //   return this.usersModel.findOne({ role });
  // }

  async findOne(username: string) {
    return this.usersModel.findOne({ username });
  }

  async create(user: CreateUserDto) {
    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(user.password, 4); // 4 es el número de veces que se encripta la contraseña
    // Creamos un nuevo usuario con la contraseña encriptada
    return await this.usersModel.create({ ...user, password: hashedPassword });
  }
}
