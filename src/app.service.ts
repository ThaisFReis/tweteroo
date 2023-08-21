import { Injectable } from '@nestjs/common';
import { User, Tweet } from './entities/entities';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  private users: User[] = []; // Array para armazenar os usuários
  private tweets: Tweet[] = []; // Array para armazenar os tweets

  // Implemente métodos para adicionar usuários e tweets
  addUser(username: string, avatar: string): void {
    // Verifica se já existe um usuário com o mesmo nome de usuário
    if (this.isUsernameTaken(username)) {
      throw new HttpException('Username already taken', HttpStatus.CONFLICT);
    }

    // Se não existe, adiciona o novo usuário
    const newUser = new User(username, avatar);
    this.users.push(newUser);
  }

  isUsernameTaken(username: string): boolean {
    return this.users.some(user => user.getUsername() === username);
  }

  addTweet(username: string, tweet: string): void {
    // Obtém o usuário com base no nome de usuário
    const user = this.users.find(u => u.getUsername() === username);
    if (!user) {
      throw new HttpException('User not registered', HttpStatus.UNAUTHORIZED);
    }

    // Salva o tweet
    const newTweet = new Tweet(user, tweet);
    this.tweets.push(newTweet);
  }

  getTweets(page: number, tweetsPerPage: number): Tweet[] {
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;

    const paginatedTweets = this.tweets.slice(startIndex, endIndex);

    return paginatedTweets;
  }

  getUserTweets(username: string): Tweet[] {
    const userTweets = this.tweets.filter(tweet => tweet.getUser().getUsername() === username);
    return userTweets;
  }
}
