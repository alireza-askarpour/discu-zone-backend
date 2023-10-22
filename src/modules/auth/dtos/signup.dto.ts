import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
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
