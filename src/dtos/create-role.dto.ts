import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enums/user-role.enum';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role value' })
  readonly value: UserRole;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  readonly description: string;
}
