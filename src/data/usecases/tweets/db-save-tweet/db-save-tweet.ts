import { SaveTweetRepository, SaveTweet, SaveTweetModel } from './db-save-tweet-protocols'

export class DbSaveTweet implements SaveTweet {
  constructor (
    private readonly saveTweetRepository: SaveTweetRepository
  ) {}

  async save (tweet: SaveTweetModel): Promise<void> {
    await this.saveTweetRepository.save(tweet)
  }
}
