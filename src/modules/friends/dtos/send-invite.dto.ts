import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SendInviteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username: string;
}
