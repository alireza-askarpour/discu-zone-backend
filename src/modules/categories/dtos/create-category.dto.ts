import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateDto {
  @ApiProperty({
    description: 'The name of category',
    type: String,
    required: true,
    example: 'Text Channels',
  })
  name: string;

  @ApiProperty({
    description: 'The server of category. must be a UUID',
    type: String,
    required: true,
    example: '2566970d-ed89-4210-954a-c804b695df67',
  })
  server: string;

  @ApiProperty({
    description: 'The private of category. must be a UUID',
    type: Boolean,
    required: true,
    example: 'true',
  })
  private: boolean;
}
