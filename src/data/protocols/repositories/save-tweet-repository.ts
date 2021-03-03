import { SaveTweetModel } from '@/domain/usecases/save-tweet'

export interface SaveTweetRepository {
  save: (tweet: SaveTweetModel) => Promise<void>
}
