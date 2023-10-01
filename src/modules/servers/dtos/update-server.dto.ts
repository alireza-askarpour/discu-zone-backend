import { ApiProperty } from '@nestjs/swagger';

export class ServerUpdateDto {
  @ApiProperty({
    type: String,
    required: true,
    default: 'Tech immigrants',
  })
  name: string;
}
