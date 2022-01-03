import 'reflect-metadata';
import { IsNotEmpty, IsString } from 'class-validator';

/*---------------------------------------------------------------------------- 
        API Command to create a new recipients lists
----------------------------------------------------------------------------*/

export class SingleListQueryResult {
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
