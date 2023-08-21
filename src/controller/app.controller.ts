import { Controller, Get, Post, Body, HttpException, HttpStatus, Query, Param } from '@nestjs/common';
import { AppService } from '../app.service';
import { SignUpDto } from './sign-up.dto';
import { TweetDto } from './tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHealth() {
    return "I'm okay!";
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {

    if (!signUpDto.username || !signUpDto.avatar) {
      throw new HttpException("All fields are required!", HttpStatus.BAD_REQUEST);
    }

    if (this.appService.isUsernameTaken(signUpDto.username)) {
      throw new HttpException('User already registered', HttpStatus.UNAUTHORIZED);
    }

    this.appService.addUser(signUpDto.username, signUpDto.avatar);

    throw new HttpException('User registered successfully', HttpStatus.OK);
  }

  @Post('tweets')
  createTweet(@Body() tweetDto: TweetDto) {
    if (!tweetDto.username || !tweetDto.tweet) {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }

    if (!this.appService.isUsernameTaken(tweetDto.username)) {
      throw new HttpException('User not registered', HttpStatus.UNAUTHORIZED);
    }

    this.appService.addTweet(tweetDto.username, tweetDto.tweet);

    return { message: 'Tweet created successfully' };
  }

  @Get('tweets')
  getTweets(@Query('page') page: string) {
    const tweetsPerPage = 15;

    if (page && (isNaN(Number(page)) || Number(page) < 1)) {
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
    }

    const paginatedTweets = this.appService.getTweets(Number(page), tweetsPerPage);

    return paginatedTweets.map(tweet => ({
      username: tweet.getUser().getUsername(),
      avatar: tweet.getUser().getAvatar(),
      tweet: tweet.getTweet(),
    }));
  }

  @Get('tweets/:username')
  getUserTweets(@Param('username') username: string) {
    const userTweets = this.appService.getUserTweets(username);

    return userTweets.map(tweet => ({
      username: tweet.getUser().getUsername(),
      avatar: tweet.getUser().getAvatar(),
      tweet: tweet.getTweet(),
    }));
  }
}