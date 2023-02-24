import { ApiProperty } from '@nestjs/swagger';
import {
  ModuleTypeAccess,
  Role,
} from 'apps/shared/entity/types';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

class ControlsArray {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  controls: Array<ModuleTypeAccess>;
}

export class UserCreatedDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    isArray: true,
    type: ControlsArray,
  })
  @IsArray()
  moduleAccess: ControlsArray[];

  @ApiProperty({ enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  sub_companies: Array<string>;
}
