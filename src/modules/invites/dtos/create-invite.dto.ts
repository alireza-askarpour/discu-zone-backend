import { ApiProperty } from '@nestjs/swagger';

export class InviteCreateDto {
  inviterId: string;
  serverId: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  expiresAt: Date;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  maxUse: number;
}
