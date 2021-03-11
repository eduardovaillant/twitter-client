import 'module-alias/register'
import env from './config/env'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { TweetStream } from '@/data/usecases/tweets/tweet-stream/tweet-stream'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    const stream = new TweetStream()
    await stream.on()
  })
  .catch(console.error)
