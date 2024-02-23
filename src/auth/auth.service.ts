import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto, SignInDto, forgetPasswordDto } from './dto';
import User from '../schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signup(dto: SignUpDto) {
    try {
      if (await User.findOne({ email: dto.email })) {
        return { msg: 'email already exists' };
      }
      if (await User.findOne({ phoneNumber: dto.phoneNumber })) {
        return { msg: 'phone number already exists' };
      }

      const user = new User({
        fullname: dto.fullname,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
        phoneNumber: dto.phoneNumber,
        role: dto.role && dto.role.length > 0 ? dto.role : ['Patient'],
      });

      await user.save();

      return { msg: 'signup success' };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async signin(dto: SignInDto) {
    try {
      const user =
        (await User.findOne({ email: dto.loginIdentifier })) ||
        (await User.findOne({ phoneNumber: dto.loginIdentifier }));
      if (user && (await bcrypt.compare(dto.password, user.password))) {
        return this.signToken(
          user._id.toString(),
          user.email,
          user.phoneNumber,
        );
      } else {
        return { msg: 'wrong credentials' };
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }
  signToken(
    userId: String,
    email: String,
    phoneNumber: String,
  ): Promise<String> {
    const payload = {
      sub: userId,
      email,
      phoneNumber,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '10h',
      secret: this.config.get('JWT_SECRET'),
    });
  }
  forgetPassword(tdo: forgetPasswordDto) {}
}
