import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import User from '../schemas/user.schema';

@Injectable()
export class AuthService {
  async signup(dto: AuthDto) {
    try {
      const existingUser = await User.findOne({ email: dto.email });
      if (existingUser) {
        return { msg: 'email already exists' };
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = new User({
        fullname: dto.fullname,
        email: dto.email,
        password: hashedPassword,
        phoneNumber: dto.phoneNumber,
        role: ['client'],
      });

      await user.save();

      return { msg: 'signup success' };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      const user =
        (await User.findOne({ email: dto })) ||
        (await User.findOne({ phoneNumber: dto.phoneNumber }));
      if (user && (await bcrypt.compare(dto.password, user.password))) {
        return { msg: 'signin' };
      } else {
        return { msg: 'wrong credentials' };
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }
}
