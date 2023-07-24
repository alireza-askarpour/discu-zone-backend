import { ApiProperty } from '@nestjs/swagger';

export class RoleUpdateDto {
  @ApiProperty({
    description: 'The name of role',
    required: true,
    type: String,
    example: 'Admin',
  })
  name: string;

  @ApiProperty({
    description: 'The color of role. color should be hexadezimal',
    required: true,
    type: String,
    example: '#fff314',
  })
  color: string;

  @ApiProperty({
    description: 'The permissions of role. permissions should be list of uuid',
    required: true,
    type: Array,
    example: [
      '541b06bc-2511-4964-b7ac-917fe4884111',
      '9e610e93-869c-4750-8be0-be2e33343bf1',
    ],
  })
  permissions: string[];
}
