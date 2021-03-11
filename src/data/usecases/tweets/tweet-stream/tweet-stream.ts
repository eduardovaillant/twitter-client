import { TweetModel } from '@/domain/models/tweet-model'
import { ITweetStream } from '@/domain/usecases/tweet-stream'
import env from '@/main/config/env'
import needle from 'needle'

// TODO unit tests
export class TweetStream implements ITweetStream {
  async on (): Promise<void> {
    const config = { headers: { Authorization: `Bearer ${env.bearerToken}` } }
    const streamUrl = 'https://api.twitter.com/2/tweets/search/stream'

    const stream = needle.get(streamUrl, config)

    stream.on('data', async (data) => {
      try {
        const json = JSON.parse(data)

        const tweet: TweetModel = {
          id: json.data.id,
          text: json.data.text,
          matching_rules: json.matching_rules
        }

        console.log(tweet.text)
      } catch (error) {
        console.error(error)
      }
    })
  }
}
