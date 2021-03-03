import { DbSaveTweet } from './db-save-tweet'
import { SaveTweetRepository, SaveTweetModel } from './db-save-tweet-protocols'

const makeSaveTweetRepositoryStub = (): SaveTweetRepository => {
  class SaveTweetRepositoryStub implements SaveTweetRepository {
    async saveTweet (tweet: SaveTweetModel): Promise<void> {
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
    const saveTweetSpy = jest.spyOn(saveTweetRepositoryStub, 'saveTweet')
    await sut.save(makeFakeSaveTweetModel())
    expect(saveTweetSpy).toHaveBeenCalledWith(makeFakeSaveTweetModel())
  })

  test('should throw if SaveTweetRepository throws', async () => {
    const { sut, saveTweetRepositoryStub } = makeSut()
    jest.spyOn(saveTweetRepositoryStub, 'saveTweet').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.save(makeFakeSaveTweetModel())
    await expect(promise).rejects.toThrow()
  })
})
