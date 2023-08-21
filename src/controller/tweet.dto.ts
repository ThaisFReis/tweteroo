import { IsString } from 'class-validator';

export class TweetDto {
    @IsString()
    username: string;

    @IsString()
    tweet: string;
}
