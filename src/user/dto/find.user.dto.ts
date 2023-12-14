import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}