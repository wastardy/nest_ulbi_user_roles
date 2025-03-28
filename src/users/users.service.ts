import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import errorConstants from 'src/constants/error.constants';
import { RolesService } from 'src/roles/roles.service';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });

    if (!users) {
      throw new NotFoundException(errorConstants.USERS_NOT_FOUND);
    }

    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(errorConstants.USER_NOT_FOUND);
    }

    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    const userRole = await this.roleService.getRoleByValue(role);

    await user.$set('roles', [userRole.id]);

    return user;
  }
}
