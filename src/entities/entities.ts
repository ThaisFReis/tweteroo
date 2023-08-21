export class User {
    private username: string;
    private avatar: string;

    constructor(username: string, avatar: string) {
        this.username = username;
        this.avatar = avatar;
    }

    getUsername(): string {
        return this.username;
    }

    getAvatar(): string {
        return this.avatar;
    }
}

export class Tweet {
    private user: User;
    private tweet: string;

    constructor(user: User, tweet: string) {
        this.user = user;
        this.tweet = tweet;
    }

    getUser(): User {
        return this.user;
    }

    getTweet(): string {
        return this.tweet;
    }
}