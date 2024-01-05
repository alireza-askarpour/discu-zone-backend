import {
  Length,
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
