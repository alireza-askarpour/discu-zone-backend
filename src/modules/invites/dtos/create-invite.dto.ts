import { ApiProperty } from '@nestjs/swagger';

export class InviteCreateDto {
  inviterId: string;
  serverId: string;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  expiresAt: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  maxUse: number;
}
