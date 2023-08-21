import { Injectable } from '@nestjs/common';
import { User, Tweet } from './entities/entities';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  private users: User[] = [];
  private tweets: Tweet[] = [];

  addUser(username: string, avatar: string): void {
    if (this.isUsernameTaken(username)) {
      throw new HttpException('Username already taken', HttpStatus.CONFLICT);
    }

    if (!avatar) {
      throw new HttpException("All fields are required!", HttpStatus.BAD_REQUEST);
    }

    if (!this.isURLValid(avatar)) {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User(username, avatar);
    this.users.push(newUser);
  }

  isUsernameTaken(username: string): boolean {
    return this.users.some(user => user.getUsername() === username);
  }

  isURLValid(url: string): boolean {
    const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return urlRegex.test(url);
  }

  addTweet(username: string, tweet: string): void {
    const user = this.users.find(u => u.getUsername() === username);
    if (!user) {
      throw new HttpException('User not registered', HttpStatus.UNAUTHORIZED);
    }

    const newTweet = new Tweet(user, tweet);
    this.tweets.push(newTweet);
  }

  getTweets(page: number, tweetsPerPage: number): Tweet[] {
    if (!page || page < 1) {
      return this.tweets.slice(-tweetsPerPage).reverse();
    }

    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;

    return this.tweets.slice(startIndex, endIndex).reverse();
  }

  getUserTweets(username: string): Tweet[] {
    const userTweets = this.tweets.filter(tweet => tweet.getUser().getUsername() === username);
    return userTweets;
  }

}
