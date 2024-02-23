import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  loginIdentifier: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
