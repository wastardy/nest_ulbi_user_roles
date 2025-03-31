import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../dtos/create-user.dto';
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
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (!user) {
      throw new NotFoundException(errorConstants.USER_NOT_FOUND);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      attributes: ['id', 'email', 'password'],
      include: { all: true },
    });

    if (!user) return null;

    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const existingUser = await this.getUserByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException(errorConstants.USER_ALREADY_EXISTS);
    }

    const existingRole = await this.roleService.getRoleByValue(role);

    if (!existingRole) {
      throw new NotFoundException(errorConstants.ROLE_NOT_FOUND);
    }

    const user = await this.userRepository.create(createUserDto);
    const userRole = await this.roleService.getRoleByValue(role);

    await user.$set('roles', [userRole.id]);

    user.email = createUserDto.email;
    user.roles = [userRole];

    return user;
  }
}
