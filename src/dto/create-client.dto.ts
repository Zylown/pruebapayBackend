import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  // @IsNotEmpty()
  names?: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  options: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  amount: number;
}
