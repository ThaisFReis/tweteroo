import { IsString, IsUrl } from 'class-validator';

export class SignUpDto {
    @IsString()
    username: string;

    @IsUrl()
    avatar: string;
}
