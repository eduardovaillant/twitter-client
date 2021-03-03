import { SaveTweetRepository } from '@/data/protocols/repositories/save-tweet-repository'
import { SaveTweet, SaveTweetModel } from '@/domain/usecases/save-tweet'

export class DbSaveTweet implements SaveTweet {
  constructor (
    private readonly saveTweetRepository: SaveTweetRepository
  ) {}

  async save (tweet: SaveTweetModel): Promise<void> {
    await this.saveTweetRepository.save(tweet)
  }
}
