import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SendInviteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username: string;
}
