import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, forgetPasswordDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
  @Post('forgetPassword')
  forgetPassword(@Body() dto: forgetPasswordDto) {
    return this.authService.forgetPassword(dto);
  }
}
