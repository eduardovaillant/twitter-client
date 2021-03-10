import { ITweetStream } from '@/domain/usecases/tweet-stream'
import env from '@/main/config/env'
import needle from 'needle'

export class TweetStream implements ITweetStream {
  async on (): Promise<void> {
    const config = { headers: { Authorization: `Bearer ${env.bearerToken}` } }
    const streamUrl = 'https://api.twitter.com/2/tweets/search/stream'

    needle.get(streamUrl, config)
  }
}
