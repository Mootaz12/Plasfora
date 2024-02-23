import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  IsInt,
  IsArray,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsInt()
  @IsNotEmpty()
  phoneNumber: Number;

  @IsArray({ message: 'Admin, Doctor, Assistant or Patient' })
  role: String[] = ['Admin', 'Doctor', 'Assistant', 'Patient'];
}
