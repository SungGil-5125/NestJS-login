import { IsString, IsNumber } from "class-validator";
export class UserDTO{
    @IsString()
    readonly username : string;

    @IsString()
    password : string;
    
    @IsNumber()
    readonly id: number;
}