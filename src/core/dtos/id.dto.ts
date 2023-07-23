import { IsUUID } from 'class-validator';
import { ResponseMessages } from '../constants/response-messages.constant';

export class IdDto {
  @IsUUID('4', { message: ResponseMessages.INVALID_ID })
  id: string;
}
