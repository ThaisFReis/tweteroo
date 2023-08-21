import { Controller, Get, Post, Body, HttpException, HttpStatus, Query, Param } from '@nestjs/common';
import { AppService } from '../app.service';
import { SignUpDto } from './sign-up.dto';
import { TweetDto } from './tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // ... outros métodos ...

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    if (!signUpDto.username || !signUpDto.avatar) {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }

    // Salva o usuário usando o serviço
    this.appService.addUser(signUpDto.username, signUpDto.avatar);

    return { message: 'User registered successfully' };
  }

  @Post('tweets') // Rota POST /tweets
  createTweet(@Body() tweetDto: TweetDto) {
    if (!tweetDto.username || !tweetDto.tweet) {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }

    // Verifica se o usuário está registrado
    if (!this.appService.isUsernameTaken(tweetDto.username)) {
      throw new HttpException('User not registered', HttpStatus.UNAUTHORIZED);
    }

    // Salva o tweet usando o serviço
    this.appService.addTweet(tweetDto.username, tweetDto.tweet);

    return { message: 'Tweet created successfully' };
  }

  @Get('tweets') // Rota GET /tweets
  getTweets(@Query('page') page: number) {
    const tweetsPerPage = 15;

    // Validação da página
    if (page !== undefined && (isNaN(page) || page < 1)) {
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
    }

    const tweets = this.appService.getTweets(page, tweetsPerPage);
    return tweets;
  }

  @Get('tweets/:username') // Rota GET /tweets/:username
  getUserTweets(@Param('username') username: string) {
    const tweets = this.appService.getUserTweets(username);
    return tweets;
  }
}
