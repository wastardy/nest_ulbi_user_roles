import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  declare roleId: number;

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER })
  declare userId: number;
}
