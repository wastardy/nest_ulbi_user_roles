import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import errorConstants from 'src/constants/error.constants';
import { UserDto } from 'src/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/enums/user-role.enum';
import { User } from 'src/users/users.model';
import { TokenResponse } from 'src/dtos/token-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto): Promise<TokenResponse> {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async register(userDto: UserDto): Promise<TokenResponse> {
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

  generateToken(user: User): TokenResponse {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: UserDto): Promise<User> {
    const { email, password } = userDto;

    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new ConflictException(errorConstants.USERS_NOT_FOUND);

    const passwordEquals = await bcrypt.compare(password, user.password);

    if (user && passwordEquals) return user;

    throw new UnauthorizedException(errorConstants.INCORRECT_EMAIL_OR_PASSWORD);
  }
}
