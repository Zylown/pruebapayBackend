import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;
  
  @IsNotEmpty()
  @IsNumber()
  mount: number;
}
