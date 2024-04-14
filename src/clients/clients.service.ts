import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clients } from 'src/schemas/clients.schema';
import { CreateClientDto } from 'src/dto/clients/create-client.dto';
import { UpdateClientDto } from 'src/dto/clients/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients.name) private clientsModel: Model<Clients>,
  ) {}

  async create(createClient: CreateClientDto) {
    /*const createdClient = this.clientsModel.create();
    return createdClient;*/
    const newClient = new this.clientsModel(createClient);
    return newClient.save(); // para guardar en la base de datos
  }

  findAll() {
    return this.clientsModel.find();
  }

  async findOne(id: string) {
    return this.clientsModel.findById(id);
  }

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
}
