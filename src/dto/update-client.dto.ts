import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  names?: string;

  @IsString()
  @IsOptional()
  dni?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  mount?: number;
}
