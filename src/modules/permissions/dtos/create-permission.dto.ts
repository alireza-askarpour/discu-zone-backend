import { ApiProperty } from '@nestjs/swagger';

export class PermissionCreateDto {
  @ApiProperty({
    description: 'The name of permission',
    required: true,
    type: String,
    example: 'ADMINISTRATOR',
  })
  name: string;

  @ApiProperty({
    description: 'The description of permission',
    required: true,
    type: String,
    example:
      'Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels).',
  })
  description: string;
}
