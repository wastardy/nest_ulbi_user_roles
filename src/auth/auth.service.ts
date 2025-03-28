import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import errorConstants from 'src/constants/error.constants';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/enums/user-role.enum';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {}

  async register(userDto: UserDto) {
    const { email, password } = userDto;

    const isUserExists = await this.userService.getUserByEmail(email);

    if (isUserExists) {
      throw new ConflictException(errorConstants.USER_ALREADY_EXISTS);
    } else {
      const hashedPassword: string = await bcrypt.hash(password, 10);

      const user = await this.userService.createUser(
        {
          email,
          password: hashedPassword,
        },
        UserRole.USER,
      );

      return this.generateToken(user);
    }
  }

  generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
