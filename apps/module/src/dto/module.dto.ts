import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  controls: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
