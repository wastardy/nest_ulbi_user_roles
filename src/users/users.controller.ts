import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UserRole } from '../enums/user-role.enum';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: Array<User> })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getUserById(id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, type: User })
  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
    @Body('role') role: UserRole,
  ) {
    return this.userService.createUser(createUserDto, role);
  }
}
