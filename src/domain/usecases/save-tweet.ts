import { TweetModel } from '@/domain/models/tweet-model'

export type SaveTweetModel = Omit<TweetModel, 'id'>

export interface SaveTweet {
  save: (tweet: SaveTweetModel) => Promise<void>
}
