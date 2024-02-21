import { IsNotEmpty, IsEmail, MinLength, IsArray } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Fullname must not be empty' })
  fullname: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Phone number must not be empty' })
  phoneNumber: string;
}
