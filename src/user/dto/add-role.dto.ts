/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {

  @ApiProperty()
    name: string;
    
}