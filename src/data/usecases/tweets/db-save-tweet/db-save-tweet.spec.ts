import { DbSaveTweet } from './db-save-tweet'
import { SaveTweetRepository } from '@/data/protocols/repositories/save-tweet-repository'
import { SaveTweetModel } from '@/domain/usecases/save-tweet'

const makeSaveTweetRepositoryStub = (): SaveTweetRepository => {
  class SaveTweetRepositoryStub implements SaveTweetRepository {
    async save (tweet: SaveTweetModel): Promise<void> {
    }
  }
  return new SaveTweetRepositoryStub()
}

const makeFakeSaveTweetModel = (): SaveTweetModel => (
  {
    text: 'any_text',
    tweet_id: 'any_id'
  }
)

interface SutTypes {
  sut: DbSaveTweet
  saveTweetRepositoryStub: SaveTweetRepository
}

const makeSut = (): SutTypes => {
  const saveTweetRepositoryStub = makeSaveTweetRepositoryStub()
  const sut = new DbSaveTweet(saveTweetRepositoryStub)
  return {
    sut,
    saveTweetRepositoryStub
  }
}

describe('DbSaveTweet', () => {
  test('should call SaveTweetRepository with correct value', async () => {
    const { sut, saveTweetRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveTweetRepositoryStub, 'save')
    await sut.save(makeFakeSaveTweetModel())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSaveTweetModel())
  })
})
