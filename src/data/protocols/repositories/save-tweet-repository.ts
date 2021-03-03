import { SaveTweetModel } from '@/domain/usecases/save-tweet'

export interface SaveTweetRepository {
  saveTweet: (tweet: SaveTweetModel) => Promise<void>
}
