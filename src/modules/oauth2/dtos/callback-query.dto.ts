import { IsString } from 'class-validator';
import { ICallbackQuery } from '../interfaces/callback-query.interface';

export abstract class CallbackQueryDto implements ICallbackQuery {
  @IsString()
  public code: string;

  @IsString()
  public state: string;
}
