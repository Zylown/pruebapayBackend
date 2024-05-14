import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movimientos } from './../schemas/movimientos.schema';
import { Injectable } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectModel(Movimientos.name) private movimientosModel: Model<Movimientos>,
  ) {}

  async create(createMovimiento: CreateMovimientoDto) {
    return await this.movimientosModel.create(createMovimiento);
    // para guardar en la base de datos con save()
  }

  async findAll() {
    return await this.movimientosModel.find();
  }

  // busca un movimiento por su id
  async findById(idMov: string) {
    return await this.movimientosModel.findOne({ idMov });
  }

  // busca un movimiento por su dni
  async findOne(dni: string) {
    return await this.movimientosModel.findOne({ dni });
  }
}
