import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Auth(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // @Roles('admin')
  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    const users = await this.userService.getAll();
    return res.status(200).json(users);
  }

  // @Get(':username')
  // async findOne(@Param('username') username: string) {
  //   return await this.userService.findOne(username);
  // }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const validationResult = CreateUserDto.safeParse(body);
    if (!validationResult.success) {
      console.log(validationResult.error.errors[0].message);
      throw new BadRequestException(
        validationResult.error.errors.map((err) => err.message),
      );
    }
    try {
      return await this.userService.create(body);
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        // code 11000 es para cuando hay un duplicado en la base de datos
        throw new ConflictException('Usuario ya existente');
      }
      throw error;
    }
  }
}
