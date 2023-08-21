import { IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    username: string;

    @IsString()
    avatar: string;
}
