import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import errorConstants from 'src/constants/error.constants';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async getRoleByValue(value: UserRole): Promise<Role> {
    const roleValue = value.toUpperCase();

    if (!roleValue) {
      throw new NotFoundException(errorConstants.ROLE_VALUE_NOT_FOUND);
    }

    const foundRole = await this.rolesRepository.findOne({
      where: { value: roleValue },
    });

    if (!foundRole) {
      throw new NotFoundException(errorConstants.ROLE_NOT_FOUND);
    }

    return foundRole;
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { value, description } = createRoleDto;

    const role = value.toUpperCase();

    if (!Object.values(UserRole).includes(role as UserRole)) {
      throw new NotFoundException(errorConstants.ROLE_DOES_NOT_EXIST);
    }

    const userRole = await this.rolesRepository.create({
      value,
      description,
    });

    return userRole;
  }

  // async addRoleToUser(userId: number, roles: UserRole) {}
}
