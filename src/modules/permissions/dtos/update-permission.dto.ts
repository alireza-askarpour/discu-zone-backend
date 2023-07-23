import { ApiProperty } from '@nestjs/swagger';

export class PermissionUpdateDto {
  @ApiProperty({
    description: 'The name of permission',
    type: String,
    example: 'ADMINISTRATOR',
  })
  name: string;

  @ApiProperty({
    description: 'The update description of permission',
    type: String,
    example: 'Members with this permission will have every permission.',
  })
  description: string;
}
