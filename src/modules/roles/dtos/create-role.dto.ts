import { ApiProperty } from '@nestjs/swagger';

export class RoleCreateDto {
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

  @ApiProperty({
    description: 'The server of role. server should be uuid',
    required: true,
    type: String,
    example: '9e610e93-869c-4750-8be0-be2e33343bf1',
  })
  server: string;

  @ApiProperty({
    description: 'The channel of role. channel should be uuid',
    required: true,
    type: String,
    example: '900e378b-f681-403c-9eb1-455c52e55bd6',
  })
  channel: string;
}
