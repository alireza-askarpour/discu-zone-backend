import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export abstract class ChangePasswordDto {
  @ApiProperty({
    example: 'w36Ii^wi?b2m&F',
  })
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @ApiProperty({
    example: 'w36Ii^wi?b2m&F',
  })
  @IsString()
  @MinLength(8)
  newPassword: string;

  @ApiProperty({
    example: 'w36Ii^wi?b2m&F',
  })
  @IsString()
  @MinLength(8)
  confirmNewPassword: string;
}
