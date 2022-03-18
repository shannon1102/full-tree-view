import { IsNotEmpty } from "class-validator";

export class CreateCatDto {
  @IsNotEmpty({message: "Name must not empty"})
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
