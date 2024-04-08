import { Controller, Get, Param } from '@nestjs/common';
import { DniService } from './dni.service';

@Controller('api/dni')
export class DniController {
  constructor(private dniService: DniService) {}
  @Get(':dni')
  async getDni(@Param('dni') dni: string) {
    try {
      // console.log(dni);
      const data = await this.dniService.getDni(dni);
      return { data }; // Devuelve un objeto JSON con el resultado
    } catch (error) {
      console.log(error);
      return { error: 'Error al obtener los datos' }; // Maneja errores
    }
  }
}
