import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user is banned or not',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare banned: boolean;

  @ApiProperty({
    example: 'Spreading sensitive content',
    description: 'Reason for banning',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  declare roles: Role[];
}
