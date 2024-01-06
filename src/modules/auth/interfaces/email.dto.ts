import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export abstract class EmailDto {
  @ApiProperty({
    example: 'askarpourdev@gmail.com',
  })
  @IsString()
  @IsEmail()
  @Length(5, 255)
  public email: string;
}
