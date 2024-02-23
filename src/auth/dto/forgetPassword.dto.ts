import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class forgetPasswordDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: Number;
}
