import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clients } from 'src/schemas/clients.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Clients.name) private clientsModel: Model<Clients>) {
    this.ensureIndexes(); // para crear el índice al inicializar la conexión a la base de datos
  }

  // Método para crear el índice al inicializar la conexión a la base de datos
  async ensureIndexes() {
    await this.clientsModel.createIndexes();
  }

  async create(createClient: CreateClientDto) {
    /*const createdClient = this.clientsModel.create();
    return createdClient;*/
    const newClient = new this.clientsModel(createClient);
    return newClient.save(); // para guardar en la base de datos
  }

  findAll() {
    return this.clientsModel.find();
  }

  /*async findOne(id: string) {
    return this.clientsModel.findById(id);
  }*/

  async deleteOne(id: string) {
    return this.clientsModel.findByIdAndDelete(id);
  }

  async updateOne(id: string, updateClient: UpdateClientDto) {
    return this.clientsModel.findByIdAndUpdate(id, updateClient, { new: true });
  }

  //find by dni
  async findByDni(dni: string) {
    return this.clientsModel.findOne({ dni });
  }

  //get api dni
  async getApiDni(dni: string) {
    const API_URL = 'https://dniruc.apisperu.com/api/v1/dni/';
    const API_TOKEN = process.env.API_TOKEN_PERU;
    const response = await fetch(`${API_URL}${dni}?token=${API_TOKEN}`);
    const data = await response.json();
    const { nombres, apellidoPaterno, apellidoMaterno } = data;
    const fullName = `${nombres} ${apellidoPaterno} ${apellidoMaterno}`;
    if (data.success === false) {
      return {
        success: false,
        message: 'DNI no encontrado',
      };
    } else {
      return {
        success: true,
        data: {
          fullName,
        },
      };
    }
  }
}
