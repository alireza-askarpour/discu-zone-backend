import { IsUUID } from 'class-validator';
import { ResponseMessages } from '../constants/response-messages.constant';
import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsUUID('4', { message: ResponseMessages.INVALID_ID })
  id: string;
}
