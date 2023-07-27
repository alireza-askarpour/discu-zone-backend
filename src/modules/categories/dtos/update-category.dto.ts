import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CategoryUpdateDto {
  @ApiProperty({
    description: 'The name of category',
    type: String,
    example: 'Voice Channels',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The private of category',
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  private: boolean;
}
