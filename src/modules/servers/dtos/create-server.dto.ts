import { ApiProperty } from '@nestjs/swagger';

export class ServerCreateDto {
  @ApiProperty({
    description: 'The name of server',
    type: String,
    required: true,
    default: 'Tech immigrants',
  })
  name: string;
}
