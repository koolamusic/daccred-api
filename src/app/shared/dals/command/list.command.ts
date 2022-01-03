import 'reflect-metadata';
import { IsNotEmpty, IsString } from 'class-validator';

/*---------------------------------------------------------------------------- 
        API Command to create a new recipients lists
----------------------------------------------------------------------------*/

export class CreateListCommand {
  @IsNotEmpty()
  @IsString()
  documentId!: string;

  /* JSON stringified Schema */
  // @IsNotEmpty()
  // schema!: string;

  @IsNotEmpty()
  @IsString()
  ownerId!: string;
}

/*---------------------------------------------------------------------------- 
    DTO for create list command response
----------------------------------------------------------------------------*/

export class CreateListCommandResponse {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsString()
  schema!: string;
}
