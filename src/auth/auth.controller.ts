import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('registration')
  register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }
}
